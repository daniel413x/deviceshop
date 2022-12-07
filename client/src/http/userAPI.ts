import jwt_decode from 'jwt-decode';
import {
  IUser,
  QueryReqLogin,
  QueryReqRegistration,
  QueryResUserAuthed,
} from '../types/types';
import { $authHost, $host } from './index';

export const registration = async (body: QueryReqRegistration): Promise<QueryResUserAuthed> => {
  const { data } = await $host.post('api/user/registration', body);
  localStorage.setItem('registeredToken', data.token);
  const user: IUser = jwt_decode(data.token);
  const { cart } = data;
  return { user, cart };
};

export const login = async (body: QueryReqLogin): Promise<QueryResUserAuthed> => {
  const { data } = await $host.post('api/user/login', body);
  localStorage.setItem('registeredToken', data.token);
  const user: IUser = jwt_decode(data.token);
  const { cart } = data;
  return { user, cart };
};

export const stillAuthed = async (): Promise<QueryResUserAuthed> => {
  const { data } = await $authHost.get('api/user/auth');
  localStorage.setItem('registeredToken', data.token);
  const user: IUser = jwt_decode(data.token);
  const { cart } = data;
  return { user, cart };
};
