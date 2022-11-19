import { NextFunction, Request, Response } from 'express';
import {
  Model,
  ModelStatic,
  col,
  Attributes,
  FindAttributeOptions,
  Op,
} from 'sequelize';
import ApiError from '../error/ApiError';
import {
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
} from '../types/types';
import { ADMIN } from '../utils/consts';
import { assignBodyAndProcessImages } from '../utils/functions';

export default abstract class BaseController<M extends Model> {
  model: ModelStatic<Model>;

  constructor(model: ModelStatic<Model>) {
    this.model = model;
  }

  async execFindOneByParams(req: Request, res: Response, next?: NextFunction, options?: FindOptions<M>) {
    const fetchedParamKey = Object.keys(req.params)[0];
    const fetchedParamVal = req.params[fetchedParamKey];
    if (!fetchedParamVal) {
      return next(ApiError.internal('Erroneous'));
    }
    const fetchedParamValRegex = fetchedParamVal.split('-').join('( |-)');
    const params: FindOptions<M> = {
      ...options,
    };
    params.where = {
      ...params.where,
      [fetchedParamKey]: { [Op.iRegexp]: fetchedParamValRegex },
    };
    if (req.query.attributes) {
      params.attributes = req.query.attributes as FindAttributeOptions;
    }
    const data = await this.model.findOne(params);
    return res.json(data);
  }

  async execFindOne(req: Request, res: Response, next?: NextFunction, options?: FindOptions<Attributes<M>>) {
    const params: FindOptions<Attributes<M>> = {
      ...options,
    };
    if (req.query.attributes) {
      params.attributes = req.query.attributes as FindAttributeOptions;
    }
    const data = await this.model.findOne(params);
    return res.json(data);
  }

  async execFindAndCountAll(req: Request, res: Response, options?: FindAndCountOptions<M>) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 22;
    const offset = page * limit - limit;
    const byNewest = req.query.byNewest as string;
    const order: any[] = [];
    let attributes;
    if (req.query.attributes) {
      attributes = req.query.attributes as (string | [string, string])[];
      for (let a = 0; a < attributes.length; a += 1) {
        if (/^\[/.test(attributes[a] as string)) {
          attributes[a] = JSON.parse(attributes[a] as string);
        }
      }
    }
    const params: FindAndCountOptions<M> = {
      limit,
      offset,
      order,
      attributes,
      ...options,
    };
    if (byNewest) {
      params.order = [[col('createdAt'), 'DESC']];
    }
    if (req.query.where) {
      params.where = JSON.parse(req.query.where as string);
    }
    if (req.query.search) {
      const search = JSON.parse(req.query.search as string) as { attribute: string, value: string };
      params.where = {
        ...params.where,
        [search.attribute]: { [Op.iRegexp]: search.value },
      };
    }
    const data = await this.model.findAndCountAll(params);
    return res.json(data);
  }

  async execCreate(req: Request, res: Response, options?: FindAndCountOptions<M>) {
    let form = req.body;
    if (req.files) {
      form = assignBodyAndProcessImages(req);
    }
    let data = await this.model.create(form);
    if (options) {
      data = await this.model.findByPk(data.getDataValue('id'), options);
    }
    return res.json(data);
  }

  async validateUser(req: Request, res: Response, next: NextFunction) {
    const { id: paramsId } = req.params;
    const { id: tokenId, roles } = res.locals.user;
    const dbObject: any = await this.model.findByPk(paramsId);
    const notAdmin = roles.indexOf(ADMIN) === -1;
    const notUser = dbObject.userId !== tokenId;
    if (notUser && notAdmin) {
      return next(ApiError.unauthorized('Unauthorized request'));
    }
    return undefined;
  }

  async execValidateUserAndUpdate(req: Request, res: Response, next: NextFunction) {
    this.validateUser(req, res, next);
    return this.execUpdate(req, res);
  }

  async execUpdate(req: Request, res: Response) {
    const { id } = req.params;
    let form = req.body;
    if (req.files) {
      form = assignBodyAndProcessImages(req);
    }
    await this.model.update(form, { where: { id } });
    return res.status(204).end();
  }

  async execDestroy(req: Request, res: Response, options?: DestroyOptions<M>) {
    if (options) {
      this.model.destroy({ ...options });
    } else {
      const { id } = req.params;
      this.model.destroy({ where: { id } });
    }
    return res.status(204).end();
  }

  async execValidateUserAndDestroy(req: Request, res: Response, next: NextFunction) {
    this.validateUser(req, res, next);
    return this.execUpdate(req, res);
  }
}
