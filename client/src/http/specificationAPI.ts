import {
  QueryReqFetchMultiple,
  ISpecification,
  SequelizeFindAndCountAll,
  QueryFilterSpecifications,
  SpecificationWithDeviceCount,
} from '../types/types';
import { $host } from './index';

export const fetchSpecifications = async (queryParams?: QueryReqFetchMultiple<ISpecification>): Promise<SequelizeFindAndCountAll<ISpecification>> => {
  const { data } = await $host.get('api/specification', { params: queryParams });
  return data;
};

export const fetchFilteredSpecifications = async (filteredSpecifications: QueryFilterSpecifications): Promise<SpecificationWithDeviceCount[]> => {
  const { data } = await $host.get('api/specification/filter', { params: filteredSpecifications });
  return data;
};
