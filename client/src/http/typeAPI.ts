import {
  QueryReqFetchMultiple,
  IType,
  SequelizeFindAndCountAll,
} from '../types/types';
import { $host } from './index';

export const fetchTypes = async (queryParams?: QueryReqFetchMultiple<IType>): Promise<SequelizeFindAndCountAll<IType>> => {
  const { data } = await $host.get('api/type', { params: queryParams });
  return data;
};

export const fetchType = async (name: string) => {
  const { data } = await $host.get(`api/type/${name}`);
  return data;
};
