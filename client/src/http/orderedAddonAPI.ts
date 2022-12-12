import {
  QueryReqCreateOrderedAddon,
  IOrderedAddon,
  QueryReqFetchMultiple,
  SequelizeFindAndCountAll,
} from '../types/types';
import { $authHost, $host } from './index';

export const fetchOrderedAddons = async (queryParams?: QueryReqFetchMultiple<IOrderedAddon>): Promise<SequelizeFindAndCountAll<IOrderedAddon>> => {
  const { data } = await $host.post('api/orderedaddon', { params: queryParams });
  return data;
};

export const createOrderedAddon = async (itemToAdd?: QueryReqCreateOrderedAddon): Promise<IOrderedAddon> => {
  const { data } = await $authHost.post('api/orderedaddon', itemToAdd);
  return data;
};

export const deleteOrderedAddon = async (id: string): Promise<null> => {
  const { data } = await $authHost.delete(`api/orderedaddon/${id}`);
  return data;
};
