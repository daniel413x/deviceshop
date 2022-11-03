import {
  DataTypes,
} from 'sequelize';
import { IReview, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';

// eslint-disable-next-line no-use-before-define
class Review extends BaseModel<Review> implements IReview {
  rating: number;

  body: string;

  shopProductId: string;

  userId: string;

  static associate(models: any) {
    Review.belongsTo(models.User, { targetKey: 'id', foreignKey: 'userId', as: 'user' });
    Review.belongsTo(models.ShopProduct, { targetKey: 'id', foreignKey: 'shopProductId', as: 'product' });
  }
}

export const reviewAttributes: ModelAttributes<Review> = {
  rating: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 5,
    },
  },
  body: {
    allowNull: false,
    defaultValue: '',
    type: DataTypes.STRING(2000),
  },
  shopProductId: {
    allowNull: false,
    type: DataTypes.UUID,
  },
  userId: {
    allowNull: false,
    type: DataTypes.UUID,
  },
  ...baseModelAttributes,
};

Review.init(
  {
    ...reviewAttributes,
  },
  {
    sequelize,
    modelName: 'Review',
    freezeTableName: true,
  },
);

export default Review;
