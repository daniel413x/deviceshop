import { makeAutoObservable } from 'mobx';

export default class FrontPageStore {
  sliderLoaded: boolean;

  browseTheShopLoaded: boolean;

  constructor() {
    this.sliderLoaded = false;
    this.browseTheShopLoaded = false;
    makeAutoObservable(this);
  }

  setSliderLoaded(boolean: boolean) {
    this.sliderLoaded = boolean;
  }

  setBrowseTheShopLoaded(boolean: boolean) {
    this.browseTheShopLoaded = boolean;
  }

  get readyToLoad() {
    return this.sliderLoaded && this.browseTheShopLoaded;
  }
}
