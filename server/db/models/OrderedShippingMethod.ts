import {
  DataTypes,
} from 'sequelize';
import { IOrderedShippingMethod, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import { baseModelAttributes } from './BaseModel';
import BaseOrderedShippingMethod, { baseShippingMethodAttributes } from './BaseShippingMethod';

// eslint-disable-next-line no-use-before-define
class OrderedShippingMethod extends BaseOrderedShippingMethod<OrderedShippingMethod> implements IOrderedShippingMethod {
  orderId!: string;

  static associate(models: any) {
    OrderedShippingMethod.belongsTo(models.Order, {
      targetKey: 'id',
      foreignKey: 'orderId',
      as: 'order',
    });
  }
}

export const orderedShippingMethodAttributes: ModelAttributes<OrderedShippingMethod> = {
  orderId: {
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: 'Order',
      key: 'id',
    },
  },
  ...baseShippingMethodAttributes,
  ...baseModelAttributes,
};

OrderedShippingMethod.init(
  {
    ...orderedShippingMethodAttributes,
  },
  {
    sequelize,
    modelName: 'OrderedShippingMethod',
    freezeTableName: true,
  },
);

export default OrderedShippingMethod;
