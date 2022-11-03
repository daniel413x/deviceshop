import {
  QueryReqFetchMultiple,
  SequelizeFindAndCountAll,
  IReview,
} from '../types/types';
import { $host } from './index';

export const fetchReviews = async (queryParams?: QueryReqFetchMultiple<IReview>): Promise<SequelizeFindAndCountAll<IReview>> => {
  const { data } = await $host.get('api/review', { params: queryParams });
  return data;
};

export const fetchRecentReviews = async (): Promise<SequelizeFindAndCountAll<IReview>> => {
  const { data } = await $host.get('api/review/recentlyreviewed');
  return data;
};
