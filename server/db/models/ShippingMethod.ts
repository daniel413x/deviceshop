import { IShippingMethod, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import { baseModelAttributes } from './BaseModel';
import BaseShippingMethod, { baseShippingMethodAttributes } from './BaseShippingMethod';

// eslint-disable-next-line no-use-before-define
class ShippingMethod extends BaseShippingMethod<ShippingMethod> implements IShippingMethod {}

export const shippingMethodAttributes: ModelAttributes<ShippingMethod> = {
  ...baseShippingMethodAttributes,
  ...baseModelAttributes,
};

ShippingMethod.init(
  {
    ...shippingMethodAttributes,
  },
  {
    sequelize,
    modelName: 'ShippingMethod',
    freezeTableName: true,
  },
);

export default ShippingMethod;
