import {
  DataTypes,
} from 'sequelize';
import { IShopProduct, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class ShopProduct extends BaseModel<ShopProduct> implements IShopProduct {
  name!: string;

  price!: number;

  discount!: number;

  discountedPrice!: number;

  description!: string;

  rating!: number;

  thumbnail!: string;

  images!: string[];

  numberSold!: number;

  stock!: number;

  typeId!: string;

  brandId!: string;

  static associate(models: any) {
    ShopProduct.hasMany(models.Specification, {
      sourceKey: 'id',
      foreignKey: 'shopProductId',
      as: 'specifications',
    });
    ShopProduct.hasMany(models.OrderedProduct, {
      sourceKey: 'id',
      foreignKey: 'shopProductId',
      as: 'products',
    });
    ShopProduct.hasMany(models.Review, {
      sourceKey: 'id',
      foreignKey: 'shopProductId',
      as: 'reviews',
    });
    ShopProduct.belongsTo(models.Brand, {
      targetKey: 'id',
      as: 'brand',
    });
    ShopProduct.belongsTo(models.Type, {
      targetKey: 'id',
      as: 'type',
    });
  }
}

export const shopProductAttributes: ModelAttributes<ShopProduct> = {
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  numberSold: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  stock: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    // unique: true,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  discountedPrice: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  discount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  rating: {
    allowNull: false,
    type: DataTypes.DECIMAL,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  typeId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Type',
      key: 'id',
    },
  },
  brandId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Brand',
      key: 'id',
    },
  },
  ...baseModelAttributes,
};

ShopProduct.init(
  {
    ...shopProductAttributes,
  },
  {
    sequelize,
    modelName: 'ShopProduct',
    freezeTableName: true,
  },
);

export default ShopProduct;
