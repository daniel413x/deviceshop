import {
  QueryReqOrderedProduct,
  QueryReqFetchMultiple,
  IOrderedProduct,
  SequelizeFindAndCountAll,
} from '../types/types';
import { $authHost, $host } from './index';

export const fetchOrderedProducts = async (queryParams?: QueryReqFetchMultiple<IOrderedProduct>): Promise<SequelizeFindAndCountAll<IOrderedProduct>> => {
  const { data } = await $host.get('api/orderedproduct', { params: queryParams });
  // orderId: null to get cart items
  return data;
};

export const createOrderedProduct = async (itemToAdd?: QueryReqOrderedProduct): Promise<IOrderedProduct> => {
  const { data } = await $authHost.post('api/orderedproduct', itemToAdd);
  return data;
};

export const eligibileToReview = async (id: string): Promise<IOrderedProduct> => {
  const { data } = await $authHost.get(`api/review/eligibility/${id}`);
  return data;
};

export const deleteOrderedProduct = async (id: string): Promise<null> => {
  const { data } = await $authHost.delete(`api/orderedproduct/${id}`);
  return data;
};
