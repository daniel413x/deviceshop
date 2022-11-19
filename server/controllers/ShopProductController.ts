import { NextFunction, Request, Response } from 'express';
import { col, Op } from 'sequelize';
import User from '../db/models/User';
import ShopProduct from '../db/models/ShopProduct';
import BaseController from './BaseController';
import Brand from '../db/models/Brand';
import Type from '../db/models/Type';
import Specification from '../db/models/Specification';
import { FilteredSearchParams, FindAndCountOptions, SearchViaSearchbarParams } from '../types/types';
import Review from '../db/models/Review';

class ShopProductController extends BaseController<ShopProduct> {
  constructor() {
    super(ShopProduct);
  }

  async get(req: Request, res: Response) {
    const options: FindAndCountOptions<ShopProduct> = {
      include: [
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
      ],
    };
    if (req.query.searchbar) {
      const search = JSON.parse(req.query.searchbar as string) as SearchViaSearchbarParams;
      const searchTerms = search.value.split(' ');
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
    options.distinct = true;
    this.execFindAndCountAll(req, res, options);
  }

  getByName(req: Request, res: Response, next: NextFunction) {
    const options = {
      include: [{
        model: User,
        as: 'User',
      }],
    };
    return this.execFindOneByParams(req, res, next, options);
  }

  create(req: Request, res: Response) {
    this.execCreate(req, res);
  }

  edit(req: Request, res: Response) {
    this.execUpdate(req, res);
  }

  delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new ShopProductController();
