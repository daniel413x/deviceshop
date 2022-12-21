import {
  DataTypes,
} from 'sequelize';
import { IOrder, ModelAttributes } from '../../types/types';
import {
  CANCELED,
  CANCELLATION_REQUESTED,
  DELIVERED,
  PROCESSING,
  SHIPPED,
} from '../../utils/consts';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class Order extends BaseModel<Order> implements IOrder {
  id!: string;

  userId!: string;

  total!: number;

  status!: ('Processing' | 'Shipped' | 'Cancellation requested' | 'Canceled' | 'Delivered' | 'Return requested')[];

  static associate(models: any) {
    Order.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId',
      as: 'user',
    });
    Order.hasMany(models.OrderedProduct, {
      sourceKey: 'id',
      foreignKey: 'orderId',
      as: 'orderItems',
    });
    Order.hasOne(models.AddressForOrder, {
      sourceKey: 'id',
      foreignKey: 'orderId',
      as: 'orderAddress',
    });
    Order.hasOne(models.OrderedShippingMethod, {
      sourceKey: 'id',
      foreignKey: 'orderId',
      as: 'shippingMethod',
    });
  }
}

export const orderAttributes: ModelAttributes<Order> = {
  status: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.STRING),
    validate: {
      isValidStatusStrings(value) {
        if (!value) {
          return value;
        }
        const values = (Array.isArray(value)) ? value : [value];
        values.forEach((val) => {
          if (val !== PROCESSING && val !== SHIPPED && val !== CANCELLATION_REQUESTED && val !== CANCELED && val !== DELIVERED) {
            throw new Error('Invalid status string');
          }
        });
        return value;
      },
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ...baseModelAttributes,
};

Order.init(
  {
    ...orderAttributes,
  },
  {
    sequelize,
    modelName: 'Order',
    freezeTableName: true,
  },
);

export default Order;
