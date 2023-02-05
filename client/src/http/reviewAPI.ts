import {
  QueryReqFetchMultiple,
  SequelizeFindAndCountAll,
  IReview,
  QueryReqCreateReview,
} from '../types/types';
import { $authHost, $host } from './index';

export const fetchReviews = async (queryParams?: QueryReqFetchMultiple<IReview>): Promise<SequelizeFindAndCountAll<IReview>> => {
  const { data } = await $host.get('api/review', { params: queryParams });
  return data;
};

export const fetchRecentReviews = async (): Promise<SequelizeFindAndCountAll<IReview>> => {
  const { data } = await $host.get('api/review/recentlyreviewed');
  return data;
};

export const createReview = async (form: QueryReqCreateReview): Promise<IReview> => {
  const { data } = await $authHost.post('api/review', form);
  return data;
};

export const updateReview = async (id: string, form: QueryReqCreateReview): Promise<IReview> => {
  const { data } = await $authHost.put(`api/review/${id}`, form);
  return data;
};
