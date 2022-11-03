import {
  ShopElementAttributes,
  QueryReqFetchOne,
  IShopElement,
} from '../types/types';
import { $host } from './index';

export const fetchShopElementByReferences = async (arr: string[]): Promise<IShopElement[]> => {
  const { data } = await $host.get('api/shopelement', {
    params: {
      where: {
        reference: arr,
      },
    },
  });
  return data.rows;
};

export const fetchShopElementByReference = async (reference: string, queryParams?: QueryReqFetchOne<ShopElementAttributes>): Promise<IShopElement> => {
  const { data } = await $host.get(`api/shopelement/${reference}`, {
    params: queryParams,
  });
  return data;
};
