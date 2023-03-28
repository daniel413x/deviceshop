import {
  QueryReqFetchMultiple,
  SequelizeFindAndCountAll,
  ISpecificationCategory,
} from '../types/types';
import { $host } from './index';

// eslint-disable-next-line import/prefer-default-export
export const fetchSpecificationCategories = async (queryParams?: QueryReqFetchMultiple<ISpecificationCategory>): Promise<SequelizeFindAndCountAll<ISpecificationCategory>> => {
  const { data } = await $host.get('api/specificationcategory', { params: queryParams });
  return data;
};
