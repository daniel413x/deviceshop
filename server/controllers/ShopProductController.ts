import fs from 'fs';
import { NextFunction, Request, Response } from 'express';
import {
  col,
  // fn,
  literal,
  Op,
} from 'sequelize';
import path from 'path';
import ShopProduct from '../db/models/ShopProduct';
import BaseController from './BaseController';
import Brand from '../db/models/Brand';
import Type from '../db/models/Type';
import Specification from '../db/models/Specification';
import {
  FilteredSearchParams, FindAndCountOptions, ISpecification,
} from '../types/types';
import Review from '../db/models/Review';
import { assignBodyAndWriteAndUpdateFiles, calcIntPrices, toFilename } from '../utils/functions';
import ApiError from '../error/ApiError';

const includeAll = [
  {
    model: Brand,
    as: 'brand',
  },
  {
    model: Type,
    as: 'type',
  },
  {
    model: Specification,
    as: 'specifications',
  },
  {
    model: Review,
    as: 'reviews',
  },
];

const getReviewCounts = [
  literal(`(
    SELECT COUNT(id)
        FROM "Review"
    WHERE 
        "Review"."shopProductId" = "ShopProduct"."id"
    )`),
  'reviewCounts',
];

class ShopProductController extends BaseController<ShopProduct> {
  constructor() {
    super(ShopProduct);
  }

  async get(req: Request, res: Response) {
    const options: FindAndCountOptions<ShopProduct> = {
      include: includeAll,
    };
    options.distinct = true;
    if (req.query.searchbar) {
      const search = req.query.searchbar as string;
      const searchTerms = search.split(' ');
      const searchParams = searchTerms.map((value) => ({
        value: { [Op.iRegexp]: value },
      }));
      const fetchedSpecifications = await Specification.findAll({
        where: {
          [Op.or]: searchParams,
        },
      });
      const tuples = [];
      fetchedSpecifications.forEach((spec) => {
        for (let i = 0; i < tuples.length; i += 1) {
          if (tuples[i][0] === spec.shopProductId) {
            return tuples[i][1].push(spec.value);
          }
        }
        return tuples.push([spec.shopProductId, [spec.value]]);
      });
      const matchedIds = tuples.filter((tuple) => {
        const specValues = tuple[1];
        if (specValues.length < searchTerms.length - 2) {
          return false;
        }
        let matchScore = 0;
        for (let i = 0; i < searchTerms.length; i += 1) {
          for (let j = 0; j < specValues.length; j += 1) {
            if (specValues[j].toLowerCase().includes(searchTerms[i].toLowerCase())) {
              matchScore += 1;
              break;
            }
          }
        }
        if (matchScore < searchTerms.length) {
          return false;
        }
        return true;
      })
        .map((tuple) => tuple[0]);
      options.where = {
        id: matchedIds,
      };
      delete req.query.searchbar;
    }
    if (req.query.filteredSearch) {
      const search = JSON.parse(req.query.filteredSearch as string) as FilteredSearchParams;
      const proceed = search.specifications.length > 0;
      if (proceed) {
        const specificationsToFetch = search.specifications.map(({ key, value }) => ({
          value: { [Op.iLike]: value },
          key: { [Op.iLike]: key },
        }));
        const fetchedSpecifications = await Specification.findAll({
          where: {
            [Op.or]: specificationsToFetch,
          },
        });
        const uniqueSpecificationKeys = [];
        fetchedSpecifications.forEach((spec) => {
          if (uniqueSpecificationKeys.indexOf(spec.key) === -1) {
            uniqueSpecificationKeys.push(spec.key);
          }
        });
        const arraysOfUniqueShopProductIds = uniqueSpecificationKeys.map((uniqueKey) => {
          const uniqueProductIdArr = [];
          fetchedSpecifications.forEach((fetchedSpecification) => {
            if (uniqueKey === fetchedSpecification.key && uniqueProductIdArr.indexOf(fetchedSpecification.shopProductId) === -1) { uniqueProductIdArr.push(fetchedSpecification.shopProductId); }
          });
          return uniqueProductIdArr;
        });
        const allShopProductIds = [];
        fetchedSpecifications.forEach((spec) => {
          if (allShopProductIds.indexOf(spec.shopProductId) === -1) {
            allShopProductIds.push(spec.shopProductId);
          }
        });
        const matchedIds = [];
        allShopProductIds.forEach((id) => {
          for (let a = 0; a < arraysOfUniqueShopProductIds.length; a += 1) {
            if (arraysOfUniqueShopProductIds[a].indexOf(id) === -1) {
              return;
            }
          }
          matchedIds.push(id);
        });
        options.where = {
          id: matchedIds,
        };
        options.distinct = true;
        delete req.query.filteredSearch;
      }
    }
    if (req.query.order) {
      const order = JSON.parse(req.query.order as string);
      const byMostSold = order.byMostSold as string;
      const byHighestRated = order.byHighestRated as string;
      const byLowestPrice = order.byLowestPrice as string;
      if (byMostSold) {
        options.order = [[col('numberSold'), 'DESC']];
      }
      if (byHighestRated) {
        options.order = [[col('rating'), 'DESC']];
      }
      if (byLowestPrice) {
        options.order = [[col('price'), 'ASC']];
      }
    }
    // options.where = {
    //   ...options.where,
    //   deleted: false,
    // };
    this.execFindAndCountAll(req, res, options);
  }

  getByName(req: Request, res: Response, next: NextFunction) {
    const options: any = {
      include: includeAll,
    };
    let attributes;
    if (req.query.attributes) {
      attributes = [
        ...req.query.attributes as (string[] | [string, string][]),
      ];
    } else {
      attributes = [
        ...Object.keys(ShopProduct.getAttributes()),
      ];
    }
    attributes.push(getReviewCounts);
    options.attributes = attributes;
    return this.execFindOneByParams(req, res, next, options);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    if (!req.files) {
      return next(ApiError.badRequest('Attribute "images" missing or empty'));
    }
    const body = assignBodyAndWriteAndUpdateFiles(req); // create product images
    const form = {
      ...body,
      specifications: null,
    };
    const thumbnail = form.images[0];
    form.thumbnail = thumbnail;
    const {
      price,
      discountedPrice,
    } = calcIntPrices(form.price, form.discount);
    form.price = price;
    form.discountedPrice = discountedPrice;
    form.rating = 0;
    form.numberSold = 0;
    const newProduct = await ShopProduct.create(form);
    const newProductSpecifications: ISpecification[] = [];
    if (body.specifications) {
      const specifications = JSON.parse(body.specifications);
      await Promise.all(specifications.map(async (specification) => {
        const newSpecification = await Specification.create({
          key: specification.key,
          value: specification.value,
          category: specification.category,
          shopProductId: newProduct.id,
          typeId: newProduct.typeId,
        });
        newProductSpecifications.push(newSpecification);
      }));
    }
    return res.json({ newProduct, newProductSpecifications });
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    const { id: productId } = req.params;
    let updatedProduct = await ShopProduct.findByPk(productId);
    let {
      images,
    } = updatedProduct;
    if (req.body.deletedImages) {
      const deletedImages = JSON.parse(req.body.deletedImages)
        .map((deletedImage) => toFilename(deletedImage)); // images may arrive as whole URLs
      images = updatedProduct.images
        .filter((image) => deletedImages
          .indexOf(image) === -1);
      const imagesEmpty = images.length === 0;
      if (imagesEmpty) {
        return next(ApiError.badRequest('Attribute "images" cannot be empty'));
      }
      const directory = path.resolve(__dirname, '..', 'static');
      deletedImages.forEach((image) => {
        const fileName = toFilename(image);
        fs.readdir(directory, (error, files) => {
          if (error) throw error;
          for (let f = 0; f < files.length; f += 1) {
            if (files[f] === fileName) {
              fs.unlink(path.join(directory, files[f]), (err) => {
                if (err) throw err;
              });
              break;
            }
          }
        });
      });
    }
    const body = assignBodyAndWriteAndUpdateFiles(req, images);
    const form = {
      ...body,
      specifications: null,
      deletedImages: null,
    };
    if (req.files) {
      const thumbnail = form.images[0];
      form.thumbnail = thumbnail;
    }
    const {
      price,
      discountedPrice,
    } = calcIntPrices(form.price, form.discount);
    form.price = price;
    form.discountedPrice = discountedPrice;
    updatedProduct = await updatedProduct.update(form);
    const specifications = JSON.parse(body.specifications);
    Specification.destroy({
      where: {
        id: {
          [Op.notIn]: specifications.map(({ id }) => id), // all of a product's specifications are sent in an array for PUT reqs. delete filters specificarions from that array. specifications not in the array are deleted
        },
        shopProductId: updatedProduct.id,
      },
    });
    await Promise.all((specifications as ISpecification[]).map(async ({
      key, value, category, id,
    }) => {
      await Specification.update({
        key,
        value,
        category,
      }, {
        where: {
          id,
        },
      });
    }));
    return res.json(updatedProduct);
  }

  async delete(req: Request, res: Response) {
    const {
      id: shopProductId,
    } = req.params;
    await Specification.destroy({
      where: {
        shopProductId,
      },
    });
    this.execDestroy(req, res);
  }
}

export default new ShopProductController();
