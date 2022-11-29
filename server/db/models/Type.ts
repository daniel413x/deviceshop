import {
  DataTypes,
} from 'sequelize';
import { IType, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class Type extends BaseModel<Type> implements IType {
  name!: string;

  static associate(models: any) {
    Type.hasMany(models.ShopProduct, {
      sourceKey: 'id',
      foreignKey: 'typeId',
      as: 'shopProducts',
    });
    Type.hasMany(models.OrderedProduct, {
      sourceKey: 'id',
      foreignKey: 'typeId',
      as: 'orderedProducts',
    });
  }
}

export const typeAttributes: ModelAttributes<Type> = {
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  ...baseModelAttributes,
};

Type.init(
  {
    ...typeAttributes,
  },
  {
    sequelize,
    modelName: 'Type',
    freezeTableName: true,
  },
);

export default Type;
