import {
  DataTypes,
} from 'sequelize';
import { ICart, IOrderedProduct, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class Cart extends BaseModel<Cart> implements ICart {
  id!: string;

  userId!: string;

  cartItems?: IOrderedProduct[];

  static associate(models: any) {
    Cart.belongsTo(models.User, {
      targetKey: 'id',
      as: 'user',
    });
    Cart.hasMany(models.OrderedProduct, {
      sourceKey: 'id',
      foreignKey: 'cartId',
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
