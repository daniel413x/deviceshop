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
import Specification from '../db/models/Specification';
import {
  FilteredSearchParams, FindAndCountOptions, ISpecification, ISpecificationCategory,
} from '../types/types';
import {
  calcIntPrices, writeImages, toFilename, flattenSpecifications,
} from '../utils/functions';
import ApiError from '../error/ApiError';
import { DELETED } from '../utils/consts';
import { sequelize } from '../db';
import { inclusionsForShopProduct, inclusionsForSpecificationCategory } from '../utils/inclusions';
import SpecificationCategory from '../db/models/SpecificationCategory';

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
      include: inclusionsForShopProduct,
    };
    options.distinct = true;
    if (req.query.search) {
      const search = req.query.search as string;
      const searchTerms = search.split(' '); // search terms can arrive as '256', 'gb', '256gb', etc
      const searchParams = searchTerms.map((value) => ({
        value: { [Op.iRegexp]: value },
      }));
      const fetchedSpecifications = await Specification.findAll({
        where: {
          [Op.or]: searchParams,
        },
      }); // products' specifications will be the basis for searching
      const tuples: [string, string[]][] = [];
      fetchedSpecifications.forEach(({ shopProductId, value }) => {
        for (let i = 0; i < tuples.length; i += 1) {
          if (tuples[i][0] === shopProductId) {
            return tuples[i][1].push(value); // built-up second index array will be used to refine results
          }
        }
        return tuples.push([shopProductId, [value]]);
      });
      const matchedIds = tuples.filter((tuple) => { // create id's to match in query
        const specValues = tuple[1];
        if (specValues.length < searchTerms.length) { // improve relevance
          return false;
        }
        let matchScore = 0;
        for (let i = 0; i < searchTerms.length; i += 1) {
          for (let j = 0; j < specValues.length; j += 1) {
            if (specValues[j].toLowerCase().includes(searchTerms[i].toLowerCase())) { // improve relevance
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
      delete req.query.search;
    }
    if (req.query.filters) {
      const search = JSON.parse(req.query.filters as string) as FilteredSearchParams;
      const proceed = search.specifications.length > 0;
      if (proceed) {
        // when all keys of a particular filtered search are the same, it is a union search. when there are different keys, it is an intersection search
        // assume the user wants to find products that are a. 256GB ({ key: 'Storage capacity', value: '256GB' }) and b. from either Apple or Samsung ({ key: 'Manufacturer', value: 'Samsung' || 'Apple' })
        const specificationsToFetch = search.specifications.map((spec) => ({
          value: { [Op.iLike]: spec.value },
          key: { [Op.iLike]: spec.key },
        })); // array to find the union of Samsung and Apple as well as all 256gb
        const fetchedSpecifications = await Specification.findAll({
          where: {
            [Op.or]: specificationsToFetch,
          },
        });
        // we must now filter down to the intersection of shop products id's of specifications where ('Samsung' || 'Apple') && '256gb'
        const uniqueSpecificationKeys: string[] = []; // ['Manufacturer', 'Storage capacity']
        fetchedSpecifications.forEach(({ key }) => {
          if (uniqueSpecificationKeys.indexOf(key) === -1) {
            uniqueSpecificationKeys.push(key);
          }
        });
        const uniqueShopProductIdsByKey: string[][] = uniqueSpecificationKeys
          .map((uniqueKey) => fetchedSpecifications
            .filter(({ key }) => key === uniqueKey)
            .map(({ shopProductId }) => shopProductId)); // a single array => union, multiple arrays => intersection
        const matchedIds = fetchedSpecifications
          .map(({ shopProductId }) => shopProductId)
          .filter((shopProductId) => uniqueShopProductIdsByKey
            .every((arr) => arr.indexOf(shopProductId) >= 0)); // shop product id's must be in every array to match all filters
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
    options.where = {
      ...options.where,
      [Op.not]: {
        flags: {
          [Op.contains]: [DELETED],
        },
      },
    };
    if (req.query.deleted) {
      options.where = {
        ...options.where,
        flags: {
          [Op.contains]: [DELETED],
        },
      };
      delete options.where[Op.not];
    }
    this.execFindAndCountAll(req, res, options);
  }

  getByName(req: Request, res: Response, next: NextFunction) {
    const options: any = {
      include: inclusionsForShopProduct,
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
    const { body } = req;
    const form = {
      ...req.body,
      specifications: undefined,
    };
    if (typeof form.images === 'string') {
      form.images = [form.images];
    }
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
    let newProduct: ShopProduct;
    let newProductSpecifications: ISpecificationCategory[];
    await sequelize.transaction(async (transaction) => {
      newProduct = await ShopProduct.create(form, { transaction });
      const {
        id: shopProductId,
      } = newProduct;
      if (body.specifications) {
        const specifications = JSON.parse(body.specifications);
        if (specifications.length) {
          await Promise.all(specifications.map(async (specification) => {
            const newSpecificationCategory = await SpecificationCategory.create({
              name: specification.name,
              shopProductId,
            }, { transaction });
            await Promise.all(specification.specifications.map(async (spec) => {
              await Specification.create({
                key: spec.key,
                value: spec.value,
                specificationCategoryId: newSpecificationCategory.id,
                shopProductId,
                typeId: newProduct.typeId,
              }, { transaction });
            }));
          }));
        }
        newProductSpecifications = await SpecificationCategory.findAll({
          where: {
            shopProductId,
          },
          include: inclusionsForSpecificationCategory,
          transaction,
        });
      }
    });
    writeImages(req);
    return res.json({ newProduct, newProductSpecifications });
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    const form = {
      ...req.body,
      specifications: undefined,
    };
    if (typeof form.images === 'string') {
      form.images = [form.images];
    }
    const { id: productId } = req.params;
    let updatedProduct = await ShopProduct.findByPk(productId);
    if (form.images) {
      const {
        images: currentImages,
      } = updatedProduct;
      const {
        images: newImages,
      } = form;
      const deletedImages = [];
      currentImages.forEach((image) => {
        if (newImages.indexOf(image) === -1) {
          deletedImages.push(image);
        }
      });
      const directory = path.resolve(__dirname, '..', 'static');
      deletedImages.forEach((image) => {
        const fileName = toFilename(image);
        fs.readdir(directory, (readError, files) => {
          if (readError) {
            next(ApiError.internal(readError.message));
          }
          for (let f = 0; f < files.length; f += 1) {
            if (files[f] === fileName) {
              fs.unlink(path.join(directory, files[f]), (unlinkErr) => {
                if (unlinkErr) {
                  next(ApiError.internal(unlinkErr.message));
                }
              });
              break;
            }
          }
        });
      });
      const thumbnail = form.images[0];
      form.thumbnail = thumbnail;
    }
    if (req.files) {
      writeImages(req);
    }
    if (form.price || form.discount) {
      const {
        price,
        discountedPrice,
      } = calcIntPrices(form.price, form.discount);
      form.price = price;
      form.discountedPrice = discountedPrice;
    }
    await sequelize.transaction(async (transaction) => {
      updatedProduct = await updatedProduct.update(form, { transaction });
      if (req.body.specifications) {
        const specificationsCategories = JSON.parse(req.body.specifications) as ISpecificationCategory[];
        const specifications = flattenSpecifications(specificationsCategories);
        await Specification.destroy({
          where: {
            id: {
              [Op.notIn]: specifications.map(({ id }) => id), // for PUT reqs, all of a product's specifications are sent in an array. any specifications not in the array (removed via interface on the front-end) are deleted from the db
            },
            shopProductId: updatedProduct.id,
          },
          transaction,
        });
        await SpecificationCategory.destroy({
          where: {
            id: {
              [Op.notIn]: specificationsCategories.map(({ id }) => id),
            },
            shopProductId: updatedProduct.id,
          },
          transaction,
        });
        await Promise.all((specificationsCategories).map(async ({
          name, id: specificationCategoryId,
        }) => {
          const specForm = {
            name,
            specificationCategoryId,
            shopProductId: productId,
          };
          const specificationCategory = await SpecificationCategory.findByPk(specificationCategoryId);
          if (specificationCategory) {
            await specificationCategory.update(specForm, { transaction });
          } else {
            await SpecificationCategory.create(specForm, { transaction });
          }
        }));
        await Promise.all((specifications as ISpecification[]).map(async ({
          key, value, specificationCategoryId, id: specificationId,
        }) => {
          const specForm = {
            key,
            value,
            specificationCategoryId,
            shopProductId: productId,
          };
          const specification = await Specification.findByPk(specificationId);
          if (specification) {
            await specification.update(specForm, { transaction });
          } else {
            await Specification.create(specForm, { transaction });
          }
        }));
      }
      return res.json(updatedProduct);
    });
  }

  async delete(req: Request, res: Response) {
    const {
      id: shopProductId,
    } = req.params;
    await sequelize.transaction(async (transaction) => {
      await Specification.destroy({
        where: {
          shopProductId,
        },
        transaction,
      });
      await this.execDestroy(req, res, { transaction });
    });
  }
}

export default new ShopProductController();
