import {
  Filter, IGuestAddedProduct, IOrderedProduct, ISpecification, ISpecificationCategory, SearchParamsRecord, SpecificationColumn,
} from '../types/types';
import { fileExtensionRegex } from './consts';

export function getExtension(string: string = ''): string {
  const extension = string.match(fileExtensionRegex);
  return extension ? extension[0] : '';
}

export function makeSlug(string: string): string {
  const id = string.toLowerCase().split(' ').filter(Boolean).join('-');
  return id;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function flattenSpecifications(specificationCategories: ISpecificationCategory[]): ISpecification[] {
  const specifications: ISpecification[] = [];
  specificationCategories.forEach((cat) => {
    specifications.push(...cat.specifications);
  });
  return specifications;
}

export function findSpecifications(keys: string[], specifications: ISpecification[]): ISpecification[] {
  const returnedArr: ISpecification[] = [];
  keys.forEach((key) => {
    const specification = specifications.find((spec) => spec.key === key);
    if (specification) {
      returnedArr.push(specification);
    }
  });
  return returnedArr;
}

export function listProductAttributes(specifications: ISpecificationCategory[]): string { // used in ShopProductCard "Grid view"
  const flattenedSpecifications: ISpecification[] = flattenSpecifications(specifications as any);
  const attributesToGet: string[] = ['Storage capacity', 'Display size (in)', 'Operating system', 'Standard', 'Memory'];
  const attributes: string[] = [];
  attributesToGet.forEach((attributeKey) => {
    const attribute = flattenedSpecifications.find((spec) => spec.key === attributeKey);
    if (attribute) {
      attributes.push(attribute.value);
    }
  });
  return `${attributes.join(', ')}`;
}

export function listProductAttributeInColumns(specificationCategories: ISpecificationCategory[]): SpecificationColumn[] { // used in ShopProductCard "List view"
  const categoriesToColumnize: string[] = ['Key specifications', 'Display properties', 'Camera'];
  const columnizedAttributes: SpecificationColumn[] = [];
  categoriesToColumnize.forEach((columnizedCategory) => {
    const values: string[] = [];
    specificationCategories.forEach((cat) => {
      if (cat.name === columnizedCategory) {
        values.push(...cat.specifications.map(({ value }) => value));
      }
    });
    columnizedAttributes.push({
      category: columnizedCategory,
      values,
    });
  });
  return columnizedAttributes;
}

export function convertPriceToInt(price: number | string, discount?: number | string): number {
  let calculatedPrice = Number(price) * 100;
  if (discount) {
    calculatedPrice -= (calculatedPrice * (Number(discount) / 100));
  }
  return Number(calculatedPrice.toFixed());
}

export function convertIntToPrice(price: number | string, discount?: number | string): number {
  let calculatedPrice = Number(price) * 0.01;
  if (discount) {
    calculatedPrice -= (calculatedPrice * (Number(discount) * 0.01));
  }
  return calculatedPrice;
}

export function formatPrice(price: number, discount?: number): string {
  const stringPrice = (discount ? price - (price * discount) : price).toString(); // discount! assumes conversion from int taken care of
  if (!/\./.test(stringPrice)) {
    return `${stringPrice}.00`;
  }
  if (!/\d+\.\d{1}/.test(stringPrice)) {
    return `${Number(stringPrice).toFixed(2)}.0`;
  }
  return Number(stringPrice).toFixed(2);
}

export function getFiltersFromSearchParamsRecord(obj: SearchParamsRecord): Filter[] {
  const filtersKeys = Object.keys(obj);
  let filters = filtersKeys.map((key) => ({
    key: key.toLowerCase(),
    value: obj[key].toLowerCase(),
  }));
  const hasEncoding = (string: string) => {
    const regex = /\|/;
    return regex.test(string);
  };
  filters.forEach((filter) => {
    if (hasEncoding(filter.value)) {
      const newFilters = filter.value.split('|');
      newFilters.forEach((value) => {
        filters.push({
          key: filter.key,
          value,
        });
      });
    }
  });
  filters = filters.filter((filter) => !hasEncoding(filter.value));
  return filters;
}

export function getMaxPage(itemsInDb: number, itemsPerPage: number) {
  return Math.ceil(itemsInDb / itemsPerPage);
}

export const objectHasProp = (obj: any, prop: string) => Object.prototype.hasOwnProperty.call(obj, prop);

export function toPlural(string: string): string {
  const lastLetter = string.split('')[string.split('').length - 1];
  if (lastLetter === 'y') {
    return string.replace(/\D$/, 'ies');
  }
  return `${string}s`;
}

export function sortCategories(categories: ISpecificationCategory[]) {
  return categories
    .slice()
    .sort((a, b) => {
      if (a.name === 'General information') {
        return -1;
      }
      if (b.name === 'General information') {
        return 1;
      }
      if (a.name === 'Key specifications') {
        return -1;
      }
      if (b.name === 'Key specifications') {
        return 1;
      }
      return 0;
    });
}

export function dateMonthYear(string: string): string {
  return new Date(string).toLocaleTimeString(navigator.language, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  }).split(',')[0].split('.').join('/');
}

export function validateEmail(string: string): boolean {
  const formattedEmail = ['', ''];
  string.split('@').forEach((p: string, i: number) => {
    formattedEmail[i] = p;
  });
  const [local, domain] = formattedEmail;
  const expectedLength = formattedEmail.length === 2;
  if (expectedLength && local && domain) {
    return true;
  }
  return false;
}

export function validatePassword(string: string): boolean {
  return /(?=^\S{6,256}$)^.+$/i.test(string);
}

export function unCamelCase(string: string): string {
  return string.split(/([A-Z][a-z]*)/).join(' ').toLowerCase().replace(/^\D/, (l) => l.toUpperCase());
}

export function selectEnd(domObjById: any): void {
  const selection = document.getSelection();
  const range = document.createRange();
  if (domObjById.lastChild?.nodeType === 3) {
    range.setStart(domObjById?.lastChild, domObjById.lastChild.nodeValue!.length);
  } else {
    range.setStart(domObjById, domObjById.childNodes.length);
  }
  selection?.removeAllRanges();
  selection?.addRange(range);
}

export function getTotal(orderItems: (IOrderedProduct | IGuestAddedProduct)[]): number {
  let total = 0;
  orderItems.forEach((item) => {
    total += item.price;
    if (item.addons && item.addons.length > 0) {
      item.addons.forEach((addon) => {
        total += addon.price;
      });
    }
  });
  return total;
}

export function getTax(total: number): number {
  return total * 0.05;
}

export function getIntTotal(orderItems: (IOrderedProduct | IGuestAddedProduct)[], shippingMethod?: number) {
  let total = getTotal(orderItems);
  const tax = getTax(total);
  if (shippingMethod) {
    total += shippingMethod;
  }
  return total + tax;
}

export function getFormattedTotal(orderItems: (IOrderedProduct | IGuestAddedProduct)[]) {
  return formatPrice(convertIntToPrice(getIntTotal(orderItems)));
}
