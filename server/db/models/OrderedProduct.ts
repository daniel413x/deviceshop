import {
  CreationOptional,
  DataTypes,
} from 'sequelize';
import { IOrderedProduct, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class OrderedProduct extends BaseModel<OrderedProduct> implements IOrderedProduct {
  price!: number;

  orderId?: CreationOptional<string>;

  cartId?: CreationOptional<string>;

  shopProductId!: string;

  brandId!: string;

  typeId!: string;

  userId!: string;

  static associate(models: any) {
    OrderedProduct.belongsTo(models.ShopProduct, {
      targetKey: 'id',
      foreignKey: 'shopProductId',
      as: 'shopproduct',
    });
    OrderedProduct.belongsTo(models.Cart, {
      targetKey: 'id',
      foreignKey: 'cartId',
      as: 'cart',
    });
    OrderedProduct.belongsTo(models.Order, {
      targetKey: 'id',
      foreignKey: 'orderId',
      as: 'order',
    });
    OrderedProduct.hasMany(models.OrderedAddon, {
      sourceKey: 'id',
      foreignKey: 'orderedProductId',
      as: 'addons',
    });
    OrderedProduct.hasOne(models.Review, {
      sourceKey: 'id',
      foreignKey: 'orderedProductId',
      as: 'review',
    });
  }
}

export const orderedProductAttributes: ModelAttributes<OrderedProduct> = {
  orderId: {
    type: DataTypes.UUID,
    references: {
      model: 'Order',
      key: 'id',
    },
  },
  cartId: {
    type: DataTypes.UUID,
    references: {
      model: 'Cart',
      key: 'id',
    },
  },
  shopProductId: {
    type: DataTypes.UUID,
    references: {
      model: 'ShopProduct',
      key: 'id',
    },
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  brandId: {
    type: DataTypes.UUID,
    references: {
      model: 'Brand',
      key: 'id',
    },
  },
  typeId: {
    type: DataTypes.UUID,
    references: {
      model: 'Type',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  ...baseModelAttributes,
};

OrderedProduct.init(
  {
    ...orderedProductAttributes,
  },
  {
    sequelize,
    modelName: 'OrderedProduct',
    freezeTableName: true,
  },
);

export default OrderedProduct;
