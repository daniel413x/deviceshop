import {
  QueryReqFetchMultipleShopProducts,
  QueryReqFetchOne,
  IShopProduct,
  SequelizeFindAndCountAll,
  QueryResPostShopProduct,
} from '../types/types';
import { $host, $authHost } from './index';

export const fetchProducts = async (queryParams?: QueryReqFetchMultipleShopProducts): Promise<SequelizeFindAndCountAll<IShopProduct>> => {
  const { data } = await $host.get('api/shopproduct', { params: queryParams });
  return data;
};

export const fetchProduct = async (title: string, queryParams?: QueryReqFetchOne<IShopProduct>) => {
  const { data } = await $host.get(`api/shopproduct/${title}`, {
    params: queryParams,
  });
  return data;
};

export const createProduct = async (form: FormData): Promise<QueryResPostShopProduct> => {
  const { data } = await $authHost.post('api/shopproduct/', form);
  return data;
};

export const updateProduct = async (id: string, form: FormData | Partial<IShopProduct>): Promise<IShopProduct> => {
  const { data } = await $authHost.put(`api/shopproduct/${id}`, form);
  return data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const { data } = await $authHost.delete(`api/shopproduct/${id}`);
  return data;
};
