import {
  DataTypes,
} from 'sequelize';
import { IReview, ModelAttributes } from '../../types/types';
import sequelize from '../connection';
import BaseModel, { baseModelAttributes } from './BaseModel';
import ShopProduct from './ShopProduct';

// eslint-disable-next-line no-use-before-define
class Review extends BaseModel<Review> implements IReview {
  rating: number;

  body: string;

  shopProductId: string;

  orderedProductId: string;

  userId: string;

  static associate(models: any) {
    Review.belongsTo(models.User, { targetKey: 'id', foreignKey: 'userId', as: 'user' });
    Review.belongsTo(models.ShopProduct, { targetKey: 'id', foreignKey: 'shopProductId', as: 'shopproduct' });
    Review.belongsTo(models.OrderedProduct, { targetKey: 'id', foreignKey: 'orderedProductId', as: 'orderedproduct' });
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
  orderedProductId: {
    allowNull: false,
    type: DataTypes.UUID,
  },
  userId: {
    allowNull: false,
    type: DataTypes.UUID,
  },
  ...baseModelAttributes,
};

const updateProductRating = async (review: Review) => {
  const { shopProductId } = review;
  const reviews = await Review.findAndCountAll({
    where: {
      shopProductId,
    },
  });
  let newRating = 0;
  reviews.rows.forEach(({ rating }) => {
    newRating += rating;
  });
  newRating /= reviews.count;
  await ShopProduct.update({
    rating: newRating,
  }, {
    where: {
      id: shopProductId,
    },
  });
};

Review.init(
  {
    ...reviewAttributes,
  },
  {
    hooks: {
      afterCreate: async (review) => {
        updateProductRating(review);
      },
      afterUpdate: async (review) => {
        updateProductRating(review);
      },
    },
    sequelize,
    modelName: 'Review',
    freezeTableName: true,
  },
);

export default Review;
