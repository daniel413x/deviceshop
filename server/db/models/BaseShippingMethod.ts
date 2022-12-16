import {
  DataTypes,
  Model,
} from 'sequelize';
import { IBaseShippingMethod, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class BaseShippingMethod<M extends Model> extends BaseModel<M> implements IBaseShippingMethod {
  price!: number;

  name!: string;
}

export const baseShippingMethodAttributes: ModelAttributes<BaseShippingMethod<any>> = {
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  ...baseModelAttributes,
};

BaseShippingMethod.init(
  {
    ...baseShippingMethodAttributes,
  },
  {
    sequelize,
    modelName: 'BaseShippingMethod',
    freezeTableName: true,
  },
);

export default BaseShippingMethod;
