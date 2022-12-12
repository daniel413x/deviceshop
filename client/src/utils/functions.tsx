import { ISpecification, SpecificationColumn } from '../types/types';

export function makeSlug(string: string): string {
  const id = string.toLowerCase().split(' ').filter(Boolean).join('-');
  return id;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
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

export function listProductAttributes(specifications: ISpecification[]): string {
  const attributesToGet: string[] = ['Storage capacity', 'Display size (in)', 'Operating system', 'Standard', 'Memory'];
  const attributes: string[] = [];
  attributesToGet.forEach((attributeKey) => {
    const attribute = specifications.find((spec) => spec.key === attributeKey);
    if (attribute) {
      attributes.push(attribute.value);
    }
  });
  return `${attributes.join(', ')}`;
}

export function listProductAttributeInColumns(specifications: ISpecification[]): SpecificationColumn[] {
  const categoriesToColumnize: string[] = ['Key specifications', 'Display properties', 'Camera'];
  const columnizedAttributes: SpecificationColumn[] = [];
  categoriesToColumnize.forEach((columnizedCategory) => {
    const values: string[] = [];
    specifications.forEach((spec) => {
      if (spec.category === columnizedCategory) {
        values.push(spec.value);
      }
    });
    columnizedAttributes.push({
      category: columnizedCategory,
      values,
    });
  });
  return columnizedAttributes;
}

export function convertPriceInt(price: number | string, discount?: number | string): number {
  let calculatedPrice = Number(price) * 0.01;
  if (discount) {
    calculatedPrice -= (calculatedPrice * (Number(discount) * 0.01));
  }
  return calculatedPrice;
}

export function formatPrice(price: number): string {
  const stringPrice = price.toString();
  if (!/\./.test(stringPrice)) {
    return `${stringPrice}.00`;
  }
  if (!/\d+\.\d{1}/.test(stringPrice)) {
    return `${price.toFixed(2)}.0`;
  }
  return price.toFixed(2);
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

export function categorizeSpecifications(specifications: ISpecification[]): ISpecification[][] {
  const uniqueCategories: string[] = [];
  specifications.forEach(({ category }) => {
    if (uniqueCategories.indexOf(category) === -1) {
      uniqueCategories.push(category);
    }
  });
  return uniqueCategories.map((uniqueCategory) => {
    const arr: ISpecification[] = [];
    specifications.forEach((spec) => {
      if (spec.category === uniqueCategory) {
        arr.push(spec);
      }
    });
    return arr;
  });
}

export function dateMonthYear(string: string): string {
  return new Date(string).toLocaleTimeString(navigator.language, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  }).split(',')[0];
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
