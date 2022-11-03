import {
  DataTypes,
} from 'sequelize';
import { IAddon, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class Addon extends BaseModel<Addon> implements IAddon {
  id!: string;

  orderedProductId!: string;

  name!: string;

  price!: number;

  static associate(models: any) {
    Addon.belongsTo(models.OrderedProduct, {
      targetKey: 'id',
      foreignKey: 'orderedProductId',
      as: 'user',
    });
  }
}

export const addonAttributes: ModelAttributes<Addon> = {
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  orderedProductId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'OrderedProduct',
      key: 'id',
    },
  },
  ...baseModelAttributes,
};

Addon.init(
  {
    ...addonAttributes,
  },
  {
    sequelize,
    modelName: 'Addon',
    freezeTableName: true,
  },
);

export default Addon;
