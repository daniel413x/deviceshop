import {
  DataTypes,
} from 'sequelize';
import { ISpecificationCategory, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class SpecificationCategory extends BaseModel<SpecificationCategory> implements ISpecificationCategory {
  name!: string;

  shopProductId!: string;

  static associate(models: any) {
    SpecificationCategory.belongsTo(models.ShopProduct, {
      targetKey: 'id',
      foreignKey: 'shopProductId',
      as: 'ShopProduct',
    });
    SpecificationCategory.hasMany(models.Specification, {
      sourceKey: 'id',
      foreignKey: 'specificationCategoryId',
      as: 'specifications',
    });
  }
}

export const specificationCategoryAttributes: ModelAttributes<SpecificationCategory> = {
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  shopProductId: {
    type: DataTypes.UUID,
    references: {
      model: 'ShopProduct',
      key: 'id',
    },
  },
  ...baseModelAttributes,
};

SpecificationCategory.init(
  {
    ...specificationCategoryAttributes,
  },
  {
    sequelize,
    modelName: 'SpecificationCategory',
    freezeTableName: true,
  },
);

export default SpecificationCategory;
