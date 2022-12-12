import {
  DataTypes,
} from 'sequelize';
import { IOrderedAddon, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class OrderedAddon extends BaseModel<OrderedAddon> implements IOrderedAddon {
  id!: string;

  orderedProductId!: string;

  price!: number;

  category!: string;

  addonId!: string;

  static associate(models: any) {
    OrderedAddon.belongsTo(models.OrderedProduct, {
      targetKey: 'id',
      foreignKey: 'orderedProductId',
      as: 'addons',
    });
    OrderedAddon.belongsTo(models.Addon, {
      targetKey: 'id',
      foreignKey: 'addonId',
      as: 'addon',
    });
  }
}

export const orderedAddonAttributes: ModelAttributes<OrderedAddon> = {
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  category: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  orderedProductId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'OrderedProduct',
      key: 'id',
    },
  },
  addonId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Addon',
      key: 'id',
    },
  },
  ...baseModelAttributes,
};

OrderedAddon.init(
  {
    ...orderedAddonAttributes,
  },
  {
    sequelize,
    modelName: 'OrderedAddon',
    freezeTableName: true,
  },
);

export default OrderedAddon;
