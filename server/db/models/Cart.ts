import {
  DataTypes,
} from 'sequelize';
import { ICart, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class Cart extends BaseModel<Cart> implements ICart {
  id!: string;

  userId!: string;

  static associate(models: any) {
    Cart.belongsTo(models.User, {
      targetKey: 'id',
      as: 'user',
    });
    Cart.hasMany(models.OrderedProduct, {
      sourceKey: 'id',
      as: 'cartItems',
    });
  }
}

export const cartAttributes: ModelAttributes<Cart> = {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  ...baseModelAttributes,
};

Cart.init(
  {
    ...cartAttributes,
  },
  {
    sequelize,
    modelName: 'Cart',
    freezeTableName: true,
  },
);

export default Cart;
