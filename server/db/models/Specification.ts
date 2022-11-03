import {
  DataTypes,
} from 'sequelize';
import { ISpecification, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class Specification extends BaseModel<Specification> implements ISpecification {
  category!: string;

  key!: string;

  value!: string;

  shopProductId!: string;

  typeId!: string;

  static associate(models: any) {
    Specification.belongsTo(models.ShopProduct, {
      targetKey: 'id',
      foreignKey: 'shopProductId',
      as: 'ShopProduct',
    });
  }
}

export const specificationAttributes: ModelAttributes<Specification> = {
  category: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  key: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  value: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  shopProductId: {
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: 'ShopProduct',
      key: 'id',
    },
  },
  typeId: {
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: 'Type',
      key: 'id',
    },
  },
  ...baseModelAttributes,
};

Specification.init(
  {
    ...specificationAttributes,
  },
  {
    sequelize,
    modelName: 'Specification',
    freezeTableName: true,
  },
);

export default Specification;
