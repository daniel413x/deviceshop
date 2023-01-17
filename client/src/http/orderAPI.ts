import {
  QueryReqCreateOrder,
  IOrder,
  SequelizeFindAndCountAll,
  QueryReqFetchMultipleOrders,
  QueryReqPutOrder,
} from '../types/types';
import { $authHost } from './index';

export const fetchOrders = async (queryParams?: QueryReqFetchMultipleOrders): Promise<SequelizeFindAndCountAll<IOrder>> => {
  const { data } = await $authHost.get('api/order', { params: queryParams });
  return data;
};

export const fetchOrdersAdmin = async (queryParams?: QueryReqFetchMultipleOrders): Promise<SequelizeFindAndCountAll<IOrder>> => {
  const { data } = await $authHost.get('api/order/admin', { params: queryParams });
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

export const editOrder = async (id: string, obj: QueryReqPutOrder): Promise<IOrder> => {
  const { data } = await $authHost.put(`api/order/${id}`, obj);
  return data;
};

export const deleteOrder = async (id: string): Promise<null> => {
  const { data } = await $authHost.delete(`api/order/${id}`);
  return data;
};
