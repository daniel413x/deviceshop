import {
  DataTypes,
} from 'sequelize';
import { IAddressInAddressBook, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseAddress, { baseAddressAttributes } from './BaseAddress';

// eslint-disable-next-line no-use-before-define
class AddressInAddressBook extends BaseAddress<AddressInAddressBook> implements IAddressInAddressBook {
  userId!: string;

  isDefault!: boolean;

  static associate(models: any) {
    AddressInAddressBook.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId',
      as: 'user',
    });
    AddressInAddressBook.hasMany(models.OrderedProduct, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'products',
    });
  }
}

export const addressInAddressBookAttributes: ModelAttributes<AddressInAddressBook> = {
  isDefault: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  ...baseAddressAttributes,
};

AddressInAddressBook.init(
  {
    ...addressInAddressBookAttributes,
  },
  {
    sequelize,
    modelName: 'AddressInAddressBook',
    freezeTableName: true,
  },
);

export default AddressInAddressBook;
