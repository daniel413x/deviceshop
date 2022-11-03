import {
  DataTypes,
} from 'sequelize';
import { IAddressForOrder, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseAddress, { baseAddressAttributes } from './BaseAddress';

// eslint-disable-next-line no-use-before-define
class AddressForOrder extends BaseAddress<AddressForOrder> implements IAddressForOrder {
  orderId!: string;

  static associate(models: any) {
    AddressForOrder.belongsTo(models.Order, {
      targetKey: 'id',
      foreignKey: 'orderId',
      as: 'order',
    });
  }
}

export const addressForOrderAttributes: ModelAttributes<AddressForOrder> = {
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  ...baseAddressAttributes,
};

AddressForOrder.init(
  {
    ...addressForOrderAttributes,
  },
  {
    sequelize,
    modelName: 'AddressForOrder',
    freezeTableName: true,
  },
);

export default AddressForOrder;
