import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import User from '../db/models/User';
import ShopProduct from '../db/models/ShopProduct';
// import ApiError from '../error/ApiError';
import BaseController from './BaseController';
import Brand from '../db/models/Brand';
import Type from '../db/models/Type';
import Specification from '../db/models/Specification';
import { FindAndCountOptions } from '../types/types';

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
      ],
    };
    if (req.query.search) {
      const search = JSON.parse(req.query.search as string) as { attribute: string, value: string };
      const searchTerms = search.value.split(' ');
      const searchParams = searchTerms.map((string) => (
        {
          value: { [Op.iRegexp]: string },
        }
      ));
      const matchedSpecifications = await Specification.findAll({
        where: {
          [Op.or]: searchParams,
        },
      });
      const tuples = [];
      matchedSpecifications.forEach((spec) => {
        for (let i = 0; i < tuples.length; i += 1) {
          if (tuples[i][0] === spec.shopProductId) {
            return tuples[i][1].push(spec.value);
          }
        }
        return tuples.push([spec.shopProductId, [spec.value]]);
      });
      const matchedIds = tuples.filter((tuple) => {
        const specificationValues = tuple[1];
        if (specificationValues.length < searchTerms.length - 2) {
          return false;
        }
        let matchScore = 0;
        for (let i = 0; i < searchTerms.length; i += 1) {
          for (let j = 0; j < specificationValues.length; j += 1) {
            if (specificationValues[j].toLowerCase().includes(searchTerms[i].toLowerCase())) { // also try .contains()
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
