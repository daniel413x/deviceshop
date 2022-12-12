import { $host } from './index';

// eslint-disable-next-line import/prefer-default-export
export const reset = async () => {
  const { data } = await $host.post('api/testing/reset');
  return data;
};
