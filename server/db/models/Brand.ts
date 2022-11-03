import {
  DataTypes,
} from 'sequelize';
import { IBrand, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';
import Type from './Type';
import TypeBrand from './TypeBrand';

// eslint-disable-next-line no-use-before-define
class Brand extends BaseModel<Brand> implements IBrand {
  name!: string;

  static associate(models: any) {
    Brand.hasMany(models.ShopProduct, {
      sourceKey: 'id',
      foreignKey: 'brandId',
      as: 'shopProducts',
    });
    Brand.hasMany(models.OrderedProduct, {
      sourceKey: 'id',
      foreignKey: 'brandId',
      as: 'orderedProducts',
    });
    Brand.belongsToMany(Type, { through: TypeBrand });
  }
}

export const brandAttributes: ModelAttributes<Brand> = {
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  ...baseModelAttributes,
};

Brand.init(
  {
    ...brandAttributes,
  },
  {
    sequelize,
    modelName: 'Brand',
    freezeTableName: true,
  },
);

export default Brand;
