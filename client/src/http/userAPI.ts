import jwt_decode from 'jwt-decode';
import {
  IUser,
  UserRegistration,
  QueryReqLogin,
  QueryReqPutUser,
  QueryReqRegistration,
  QueryResUserAuthed,
} from '../types/types';
import { $authHost, $host } from './index';

const handleNewToken = (token: string): IUser => {
  localStorage.setItem('registeredToken', token);
  const user: IUser = jwt_decode(token);
  return user;
};

export const registration = async (body: QueryReqRegistration): Promise<QueryResUserAuthed> => {
  const { data } = await $host.post('api/user/registration', body);
  const user = handleNewToken(data.token);
  const { cart } = data;
  return { user, cart };
};

export const registrationGuest = async (body: UserRegistration): Promise<IUser> => {
  const { data } = await $authHost.put('api/user/registration/guest', body);
  localStorage.setItem('registeredToken', data.token);
  const newUser = jwt_decode(data.token) as IUser;
  return newUser;
};

export const login = async (body: QueryReqLogin): Promise<QueryResUserAuthed> => {
  const { data } = await $host.post('api/user/login', body);
  const user = handleNewToken(data.token);
  const { cart } = data;
  return { user, cart };
};

export const stillAuthed = async (): Promise<QueryResUserAuthed> => {
  const { data } = await $authHost.get('api/user/auth');
  const user = handleNewToken(data.token);
  const { cart } = data;
  return { user, cart };
};

export const editUser = async (obj: QueryReqPutUser): Promise<IUser> => {
  const { data } = await $authHost.put('api/user', obj);
  const user = handleNewToken(data.token);
  return user;
};
