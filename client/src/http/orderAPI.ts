import {
  QueryReqCreateOrder,
  IOrder,
  SequelizeFindAndCountAll,
} from '../types/types';
import { $authHost } from './index';

export const fetchOrders = async (): Promise<SequelizeFindAndCountAll<IOrder>> => {
  const { data } = await $authHost.get('api/order');
  return data;
};

export const fetchOrder = async (id: string): Promise<IOrder> => {
  const { data } = await $authHost.get(`api/order/${id}`);
  return data;
};

export const createOrder = async (params?: QueryReqCreateOrder): Promise<IOrder> => {
  const { data } = await $authHost.post('api/order', params);
  return data;
};

export const deleteOrder = async (id: string): Promise<null> => {
  const { data } = await $authHost.delete(`api/order/${id}`);
  return data;
};
