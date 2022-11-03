import { ITypeBrand } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class TypeBrand extends BaseModel<TypeBrand> implements ITypeBrand {
  static associate(models: any) {
    TypeBrand.belongsTo(models.Type);
    TypeBrand.belongsTo(models.Brand);
  }
}

export const typeBrandAttributes = {
  ...baseModelAttributes,
};

TypeBrand.init(
  {
    ...typeBrandAttributes,
  },
  {
    sequelize,
    modelName: 'TypeBrand',
    freezeTableName: true,
  },
);

export default TypeBrand;
