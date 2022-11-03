import axios, { AxiosRequestConfig } from 'axios';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (reqConfig: AxiosRequestConfig) => {
  const config = { ...reqConfig };
  const token = localStorage.getItem('registeredToken') || localStorage.getItem('guestToken');
  config.headers!.authorization = `Bearer ${token}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
  $host, $authHost,
};
