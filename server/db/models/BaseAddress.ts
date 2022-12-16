import {
  CreationOptional,
  DataTypes,
  Model,
} from 'sequelize';
import { IBaseAddress, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class BaseAddress<M extends Model> extends BaseModel<M> implements IBaseAddress {
  firstName!: string;

  lastName!: string;

  addressLineOne!: string;

  addressLineTwo?: CreationOptional<string>;

  city!: string;

  state!: string;

  zip!: string;

  company?: CreationOptional<string>;
}

export const baseAddressAttributes: ModelAttributes<BaseAddress<any>> = {
  firstName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  addressLineOne: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  addressLineTwo: {
    type: DataTypes.STRING,
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  state: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  zip: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  company: {
    type: DataTypes.STRING,
  },
  ...baseModelAttributes,
};

BaseAddress.init(
  {
    ...baseAddressAttributes,
  },
  {
    sequelize,
    modelName: 'BaseAddress',
    freezeTableName: true,
  },
);

export default BaseAddress;
