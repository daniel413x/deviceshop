import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Specification from '../db/models/Specification';
// import ApiError from '../error/ApiError';
import BaseController from './BaseController';
import {
  SpecificationWithDeviceCount, SpecificationFinder, UniquePrimarySpecification,
} from '../types/types';

class SpecificationController extends BaseController<Specification> {
  constructor() {
    super(Specification);
  }

  get(req: Request, res: Response) {
    this.execFindAndCountAll(req, res);
  }

  async getFilteredSpecificationsWithCounts(req: Request, res: Response) {
    const primarySpecificationKey = req.query.primarySpecificationKey as string;
    const filters: SpecificationWithDeviceCount[] = [];
    if (req.query.filters) {
      for (let f = 0; f < req.query.filters.length; f += 1) {
        filters.push(JSON.parse(req.query.filters[f] as string));
      }
    }
    const thereAreOtherFilters = filters.length > 0;
    const primarySpecifications = await Specification.findAll({
      where: {
        key: {
          [Op.iLike]: primarySpecificationKey,
        },
      },
    });
    const uniquePrimarySpecifications: UniquePrimarySpecification[] = [];
    primarySpecifications.forEach((primarySpec) => {
      if (!uniquePrimarySpecifications.find((specInArray) => specInArray.value === primarySpec.value) && primarySpec.key.toLowerCase() === primarySpecificationKey.toLowerCase()) {
        uniquePrimarySpecifications.push({
          shopProductIds: [],
          id: primarySpec.id,
          key: primarySpec.key,
          value: primarySpec.value,
        });
      }
    });
    let shopProductIdsFromFilters = [];
    if (thereAreOtherFilters) {
      const uniqueFilterKeys: string[] = [];
      filters.forEach((filter) => {
        if (uniqueFilterKeys.indexOf(filter.key) === -1) {
          uniqueFilterKeys.push(filter.key);
        }
      });
      const specificationFinders: SpecificationFinder[] = [];
      uniqueFilterKeys.forEach((key) => {
        const specificationFinder: SpecificationFinder = {
          key,
          value: [],
        };
        filters.forEach((filter) => {
          if (specificationFinder.value.indexOf(filter.value) === -1 && key === filter.key) {
            specificationFinder.value.push(filter.value);
          }
        });
        specificationFinders.push(specificationFinder);
      });
      const uniqueProductIds = [];
      shopProductIdsFromFilters = await Promise.all((specificationFinders as SpecificationFinder[]).map(async (finder) => {
        const specsFromFilter = await Specification.findAll({
          where: {
            key: {
              [Op.iLike]: finder.key,
            },
            value: {
              [Op.iRegexp]: `${finder.value.join('|')}`,
            },
          },
        });
        const returnedKeys = [];
        specsFromFilter.forEach((spec) => {
          if (returnedKeys.indexOf(spec.shopProductId) === -1) {
            returnedKeys.push(spec.shopProductId);
          }
          if (uniqueProductIds.indexOf(spec.id) === -1) {
            uniqueProductIds.push(spec.id);
          }
        });
        return returnedKeys;
      }));
      uniqueProductIds.forEach((idA) => {
        shopProductIdsFromFilters.forEach((arr) => {
          if (arr.indexOf(idA) === -1) {
            for (let a = 0; a < shopProductIdsFromFilters.length; a += 1) {
              shopProductIdsFromFilters[a] = shopProductIdsFromFilters[a].filter((idB) => idA !== idB);
            }
          }
        });
      });
    }
    const primarySpecificationsWithDeviceCounts: SpecificationWithDeviceCount[] = await Promise.all(uniquePrimarySpecifications.map(async (uniqueSpec) => {
      const specWithDeviceCount = {
        count: 0,
        id: uniqueSpec.id,
        key: uniqueSpec.key,
        value: uniqueSpec.value,
      };
      const shopProductIds = [];
      await Specification.findAll({
        where: {
          key: uniqueSpec.key,
          value: uniqueSpec.value,
        },
      })
        .then((fetchedSpecs) => fetchedSpecs.forEach((fetchedSpec) => {
          if (shopProductIds.indexOf(fetchedSpec.shopProductId) === -1) {
            shopProductIds.push(fetchedSpec.shopProductId);
          }
        }));
      if (thereAreOtherFilters) {
        shopProductIds.forEach((id) => {
          for (let a = 0; a < shopProductIdsFromFilters.length; a += 1) {
            if (shopProductIdsFromFilters[a].indexOf(id) === -1) {
              return; // id must be present in each specification's shopProductIds to get the filtered subset
            }
          }
          specWithDeviceCount.count += 1;
        });
      } else {
        specWithDeviceCount.count = shopProductIds.length;
      }
      return specWithDeviceCount;
    }));
    return res.json(primarySpecificationsWithDeviceCounts);
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

export default new SpecificationController();
