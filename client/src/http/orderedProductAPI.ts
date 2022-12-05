import {
  QueryReqOrderedProduct,
  QueryReqFetchMultiple,
  IOrderedProduct,
  SequelizeFindAndCountAll,
} from '../types/types';
import { $host } from './index';

export const fetchOrderedProducts = async (queryParams?: QueryReqFetchMultiple<IOrderedProduct>): Promise<SequelizeFindAndCountAll<IOrderedProduct>> => {
  const { data } = await $host.get('api/orderedproduct', { params: queryParams });
  // orderId: null to get cart items
  return data;
};

export const createOrderedProduct = async (queryParams?: QueryReqOrderedProduct): Promise<IOrderedProduct> => {
  const { data } = await $host.post('api/orderedproduct', { params: queryParams });
  return data;
};

export const deleteOrderedProduct = async (id: string): Promise<null> => {
  const { data } = await $host.delete(`api/orderedproduct/${id}`);
  return data;
};
