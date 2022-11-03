import {
  TypeAttributes,
  QueryReqFetchMultiple,
  QueryReqFetchOne,
  IType,
  SequelizeFindAndCountAll,
} from '../types/types';
import { $host } from './index';

export const fetchTypes = async (queryParams?: QueryReqFetchMultiple<TypeAttributes>): Promise<SequelizeFindAndCountAll<IType>> => {
  const { data } = await $host.get('api/type', { params: queryParams });
  return data;
};

export const fetchType = async (name: string, queryParams?: QueryReqFetchOne<TypeAttributes>) => {
  const { data } = await $host.get(`api/type/${name}`, {
    params: queryParams,
  });
  return data;
};
