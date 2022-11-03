import { Sequelize } from 'sequelize';
import * as configurations from '../configs';

const config = configurations[process.env.NODE_ENV];

const {
  database,
  username,
  password,
} = config;

export default new Sequelize(
  database,
  username,
  password,
  config,
);
