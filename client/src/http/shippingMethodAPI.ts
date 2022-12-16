import {
  IShippingMethod,
  QueryReqCreateShippingMethod,
  SequelizeFindAndCountAll,
} from '../types/types';
import { $authHost } from './index';

export const fetchShippingMethods = async (): Promise<SequelizeFindAndCountAll<IShippingMethod>> => {
  const { data } = await $authHost.get('api/shippingmethod');
  return data;
};

export const createShippingMethod = async (params?: QueryReqCreateShippingMethod): Promise<IShippingMethod> => {
  const { data } = await $authHost.post('api/shippingmethod', params);
  return data;
};

export const deleteShippingMethod = async (id: string): Promise<null> => {
  const { data } = await $authHost.delete(`api/shippingmethod/${id}`);
  return data;
};
