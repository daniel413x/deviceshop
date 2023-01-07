import { makeAutoObservable } from 'mobx';
import {
  ISpecification,
  Image,
  IShopProduct,
  IType,
  IBrand,
} from '../types/types';
import { convertPriceInt } from '../utils/functions';

export default class CreateProductPageStore {
  fetchedImages: string[];

  specifications: any[];

  images: Image[];

  deletedImages: string[];

  stock: string | number;

  rating: number;

  reviewsLength: number;

  name: string;

  description: string;

  price: string | number;

  discount: string | number;

  loading: boolean;

  brand: IBrand | undefined;

  type: IType | undefined;

  id: string;

  constructor() {
    this.specifications = [];
    this.images = [];
    this.deletedImages = [];
    this.fetchedImages = [];
    this.stock = '';
    this.name = '';
    this.rating = 0;
    this.reviewsLength = 0;
    this.description = '';
    this.price = '';
    this.discount = '';
    this.loading = true;
    this.brand = undefined;
    this.type = undefined;
    this.id = '';
    makeAutoObservable(this);
  }

  setSpecifications(specs: ISpecification[]) {
    this.specifications = specs;
  }

  addSpecification(category: string) { // serves either to add a new category or a specification to a category
    const id = new Date().toString();
    const specification = {
      category,
      key: 'Key',
      value: 'Value',
      id,
    };
    this.specifications = [...this.specifications, specification];
  }

  updateSpec(id: string, field: 'key' | 'value', value: string) {
    const updatedSpec = this.specifications.find((spec) => spec.id === id);
    updatedSpec[field] = value;
    this.specifications = this.specifications.map((spec) => {
      if (spec.id === id) {
        return updatedSpec;
      }
      return spec;
    });
  }

  updateCategory(category: string, value: string) {
    this.specifications = this.specifications.map((spec) => {
      if (spec.category === category) {
        return {
          ...spec,
          category: value,
        };
      }
      return spec;
    });
  }

  deleteSpec(removedId: string) {
    this.specifications = this.specifications.filter((spec) => spec.id !== removedId);
  }

  deleteCategory(removedCategory: string) {
    this.specifications = this.specifications.filter((spec) => spec.category !== removedCategory);
  }

  setImages(newImages: Image[] | string[]) {
    let truth = true;
    newImages.forEach((img) => {
      if (typeof img !== 'string') {
        truth = false;
      }
    });
    if (truth) {
      this.images = (newImages as string[]).map((string) => ({ // generate images for admin PUT shop product form
        url: string,
        file: null,
      }));
    } else {
      this.images = (newImages as Image[]);
    }
  }

  addDeletedImage(deletedImageUrl: string) {
    this.deletedImages = [...this.deletedImages, deletedImageUrl];
  }

  setStock(value: string | number) {
    this.stock = value.toString();
  }

  setName(string: string) {
    this.name = string;
  }

  setDescription(string: string) {
    this.description = string;
  }

  setPrice(value: string | number) {
    this.price = value;
  }

  setDiscount(value: string | number) {
    this.discount = value;
  }

  setRating(value: number) {
    this.discount = value;
  }

  setReviewsLength(value: number) {
    this.discount = value;
  }

  setFetchedImages(fetchedImages: string[]) {
    this.fetchedImages = fetchedImages;
  }

  setLoading(bool: boolean) {
    this.loading = bool;
  }

  setType(type: IType) {
    this.type = type;
  }

  setBrand(brand: IBrand) {
    this.brand = brand;
  }

  setId(id: string) {
    this.id = id;
  }

  setFetchedValues(product: IShopProduct) {
    if (product.specifications) {
      this.setSpecifications(product.specifications);
    }
    if (product.brand) {
      this.setBrand(product.brand);
    }
    if (product.type) {
      this.setType(product.type);
    }
    this.setId(product.id);
    this.setBrand(product.brand);
    this.setType(product.type);
    this.setStock(product.stock);
    this.setRating(Number(product.rating));
    this.setReviewsLength(product.reviews.length);
    this.setPrice(convertPriceInt(product.price).toString());
    this.setDescription(product.description);
    this.setName(product.name);
    this.setDiscount(product.discount);
    this.setImages(product.images);
  }
}
