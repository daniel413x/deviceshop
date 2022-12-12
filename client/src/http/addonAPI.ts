import {
  QueryReqCreateAddon,
  IAddon,
  QueryReqFetchMultiple,
  SequelizeFindAndCountAll,
} from '../types/types';
import { $authHost, $host } from './index';

export const fetchAddons = async (queryParams?: QueryReqFetchMultiple<IAddon>): Promise<SequelizeFindAndCountAll<IAddon>> => {
  const { data } = await $host.get('api/addon', { params: queryParams });
  return data;
};

export const createAddon = async (itemToAdd?: QueryReqCreateAddon): Promise<IAddon> => {
  const { data } = await $authHost.post('api/addon', itemToAdd);
  return data;
};

export const deleteAddon = async (id: string): Promise<null> => {
  const { data } = await $authHost.delete(`api/addon/${id}`);
  return data;
};
