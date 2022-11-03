import {
  ShopProductAttributes,
  QueryReqFetchMultipleShopProducts,
  QueryReqFetchOne,
  IShopProduct,
  SequelizeFindAndCountAll,
} from '../types/types';
import { $host } from './index';

export const fetchProducts = async (queryParams?: QueryReqFetchMultipleShopProducts): Promise<SequelizeFindAndCountAll<IShopProduct>> => {
  const { data } = await $host.get('api/shopproduct', { params: queryParams });
  return data;
};

export const fetchProject = async (title: string, queryParams?: QueryReqFetchOne<ShopProductAttributes>) => {
  const { data } = await $host.get(`api/shopproduct/${title}`, {
    params: queryParams,
  });
  return data;
};
