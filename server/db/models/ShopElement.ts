import {
  CreationOptional,
  DataTypes,
} from 'sequelize';
import { IShopElement, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class ShopElement extends BaseModel<ShopElement> implements IShopElement {
  image?: CreationOptional<string>;

  to?: CreationOptional<string>;

  reference!: string;
}

export const shopElementAttributes: ModelAttributes<ShopElement> = {
  image: {
    type: DataTypes.STRING,
  },
  to: {
    type: DataTypes.STRING,
  },
  reference: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  ...baseModelAttributes,
};

ShopElement.init(
  {
    ...shopElementAttributes,
  },
  {
    sequelize,
    modelName: 'ShopElement',
    freezeTableName: true,
  },
);

export default ShopElement;
