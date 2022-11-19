import {
  QueryReqFetchMultiple,
  QueryReqFetchOne,
  IType,
  SequelizeFindAndCountAll,
} from '../types/types';
import { $host } from './index';

export const fetchTypes = async (queryParams?: QueryReqFetchMultiple<IType>): Promise<SequelizeFindAndCountAll<IType>> => {
  const { data } = await $host.get('api/type', { params: queryParams });
  return data;
};

export const fetchType = async (name: string, queryParams?: QueryReqFetchOne<IType>) => {
  const { data } = await $host.get(`api/type/${name}`, {
    params: queryParams,
  });
  return data;
};
