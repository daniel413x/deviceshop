import { makeAutoObservable } from 'mobx';
import {
  IReview, SequelizeFindAndCountAll,
} from '../types/types';

export default class ReviewStore {
  frontPageReviews: IReview[];

  constructor() {
    this.frontPageReviews = [];
    makeAutoObservable(this);
  }

  setFrontPageReviews(fetchedData: SequelizeFindAndCountAll<IReview>) {
    this.frontPageReviews = fetchedData.rows;
  }
}
