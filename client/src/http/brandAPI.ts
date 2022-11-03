import {
  BrandAttributes,
  QueryReqFetchMultiple,
  QueryReqFetchOne,
  IBrand,
  SequelizeFindAndCountAll,
} from '../types/types';
import { $host } from './index';

export const fetchBrands = async (queryParams?: QueryReqFetchMultiple<BrandAttributes>): Promise<SequelizeFindAndCountAll<IBrand>> => {
  const { data } = await $host.get('api/brand', { params: queryParams });
  return data;
};

export const fetchBrand = async (name: string, queryParams?: QueryReqFetchOne<BrandAttributes>) => {
  const { data } = await $host.get(`api/brand/${name}`, {
    params: queryParams,
  });
  return data;
};
