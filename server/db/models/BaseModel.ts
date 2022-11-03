import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  DataTypes,
  UUIDV4,
} from 'sequelize';
import { IBaseModel, ModelAttributes } from '../../types/types';

class BaseModel<M extends Model> extends Model<InferAttributes<M>, InferCreationAttributes<M>> implements IBaseModel {
  id!: CreationOptional<string>;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;
}

export const baseModelAttributes: ModelAttributes<BaseModel<any>> = {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
};

export default BaseModel;
