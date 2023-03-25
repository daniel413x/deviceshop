import { makeAutoObservable } from 'mobx';
import {
  ISpecification,
  IShopProduct,
  IType,
  IBrand,
} from '../types/types';
import { convertIntToPrice } from '../utils/functions';

export default class CreateProductPageStore {
  specifications: any[];

  images: string[];

  imagesCount: number;

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
    this.imagesCount = 1;
    this.deletedImages = [];
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

  setImages(newImages: string[]) {
    this.images = newImages as string[];
  }

  setImagesCount(count: number) {
    this.imagesCount = count;
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

  setLoading(bool: boolean) {
    this.loading = bool;
  }

  setType(type: IType | undefined) {
    this.type = type;
  }

  setBrand(brand: IBrand | undefined) {
    this.brand = brand;
  }

  setId(id: string) {
    this.id = id;
  }

  setAllValues(product?: IShopProduct) {
    this.setSpecifications(product?.specifications || []);
    this.setBrand(product?.brand || undefined);
    this.setType(product?.type || undefined);
    this.setId(product?.id || '');
    this.setBrand(product?.brand);
    this.setType(product?.type);
    this.setStock(product?.stock || 10);
    this.setRating(Number(product?.rating || 0));
    this.setReviewsLength(product?.reviews.length || 0);
    this.setPrice(convertIntToPrice(product?.price || 100000).toString());
    this.setDescription(product?.description || 'Product description');
    this.setName(product?.name || 'Product name');
    this.setDiscount(product?.discount || 10);
    this.setImages(product?.images || []);
  }

  missingName() {
    return this.name === '' || this.name === 'Product name';
  }

  missingDescription() {
    return this.description === '' || this.description === 'Product description';
  }

  missingImages() {
    return this.imagesCount === 0;
  }
}
