import {
  QueryReqCreateAddress,
  IAddressInAddressBook,
  QueryReqFetchMultiple,
  SequelizeFindAndCountAll,
} from '../types/types';
import { $authHost } from './index';

export const fetchAddresses = async (queryParams?: QueryReqFetchMultiple<IAddressInAddressBook>): Promise<SequelizeFindAndCountAll<IAddressInAddressBook>> => {
  const { data } = await $authHost.get('api/addressbook', { params: queryParams });
  return data;
};

export const createAddress = async (body?: QueryReqCreateAddress): Promise<IAddressInAddressBook> => {
  const { data } = await $authHost.post('api/addressbook', body);
  return data;
};

export const editAddress = async (id: string, body?: QueryReqCreateAddress): Promise<IAddressInAddressBook> => {
  const { data } = await $authHost.put(`api/addressbook/${id}`, body);
  return data;
};

export const deleteAddress = async (id: string): Promise<null> => {
  const { data } = await $authHost.delete(`api/addressbook/${id}`);
  return data;
};
