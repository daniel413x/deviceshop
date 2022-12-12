import {
  CreationOptional,
  DataTypes,
} from 'sequelize';
import { IAddon, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class Addon extends BaseModel<Addon> implements IAddon {
  id!: string;

  category!: string;

  name!: string;

  bulletPoints?: CreationOptional<string[]>;

  description?: CreationOptional<string>;

  price!: number;

  static associate(models: any) {
    Addon.hasMany(models.OrderedAddon, {
      sourceKey: 'id',
      foreignKey: 'addonId',
      as: 'orderedaddons',
    });
  }
}

export const addonAttributes: ModelAttributes<Addon> = {
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  category: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  bulletPoints: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  description: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  ...baseModelAttributes,
};

Addon.init(
  {
    ...addonAttributes,
  },
  {
    sequelize,
    modelName: 'Addon',
    freezeTableName: true,
  },
);

export default Addon;
