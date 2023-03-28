import { makeAutoObservable } from 'mobx';
import {
  IShopProduct,
  IType,
  IBrand,
  ISpecificationCategory,
} from '../types/types';
import { convertIntToPrice, flattenSpecifications } from '../utils/functions';

export default class CreateProductPageStore {
  specifications: ISpecificationCategory[];

  images: string[];

  imagesCount: number;

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

  setSpecifications(specs: ISpecificationCategory[]) {
    this.specifications = specs;
  }

  addSpecificationCategory() {
    const id = new Date().toString();
    const specificationCategory = {
      name: 'New specifications',
      typeId: '',
      shopProductId: '',
      id,
      specifications: [],
    };
    this.specifications = [...this.specifications, specificationCategory];
    this.addSpecification(id);
  }

  updateCategory(specificationCategoryId: string, value: string) {
    this.specifications = this.specifications.map((cat) => {
      if (cat.id === specificationCategoryId) {
        return {
          ...cat,
          name: value,
        };
      }
      return cat;
    });
  }

  deleteCategory(removedCategoryId: string) {
    this.specifications = this.specifications.filter((cat) => cat.id !== removedCategoryId);
  }

  addSpecification(specificationCategoryId: string) {
    const id = new Date().toString();
    const specification = {
      specificationCategoryId,
      key: 'Key',
      value: 'Value',
      typeId: '',
      shopProductId: '',
      id,
    };
    const changedCategory = this.specifications.find((cat) => cat.id === specificationCategoryId);
    changedCategory!.specifications.push(specification);
    this.specifications = this.specifications.map((category) => {
      if (category.id === specificationCategoryId) {
        return changedCategory!;
      }
      return category;
    });
  }

  updateSpec(id: string, field: 'key' | 'value', value: string) {
    const updatedSpec = flattenSpecifications(this.specifications).find((spec) => spec.id === id);
    updatedSpec![field] = value;
    for (let c = 0; c < this.specifications.length; c += 1) {
      for (let s = 0; s < this.specifications[c].specifications.length; s += 1) {
        const spec = this.specifications[c].specifications[s];
        if (spec.id === id) {
          spec.value = value;
          break;
        }
      }
    }
  }

  deleteSpec(removedId: string) {
    this.specifications = this.specifications.map((cat) => ({
      ...cat,
      specifications: cat.specifications.filter(({ id }) => removedId !== id),
    }));
  }

  setImages(newImages: string[]) {
    this.images = newImages as string[];
  }

  setImagesCount(count: number) {
    this.imagesCount = count;
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
    this.setSpecifications(product?.specificationsByCategory || []);
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
