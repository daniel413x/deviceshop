import {
  DataTypes,
  CreationOptional,
} from 'sequelize';
import { IUser, ModelAttributes, Roles } from '../../types/types';
import { USER } from '../../utils/consts';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class User extends BaseModel<User> implements IUser {
  roles!: Roles[];

  firstName!: string;

  lastName!: string;

  username!: string;

  email!: string;

  password!: string;

  avatar!: string;

  phoneNumber?: CreationOptional<string>;

  static associate(models: any) {
    User.hasMany(models.Review, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'reviews',
    });
    User.hasMany(models.Order, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'orders',
    });
    User.hasOne(models.Cart, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'cart',
    });
    User.hasOne(models.AddressInAddressBook, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'savedAddresses',
    });
  }
}

export const userAttributes: ModelAttributes<User> = {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  roles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: [USER],
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /(?=^\S{6,256}$)^.+$/i,
    },
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: 'default-avatar.jpg',
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  ...baseModelAttributes,
};

User.init({
  ...userAttributes,
}, {
  sequelize,
  modelName: 'User',
  freezeTableName: true,
});

export default User;
