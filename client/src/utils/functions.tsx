import { ISpecification } from '../types/types';
import {
  DISPLAY_SIZE,
  MANUFACTURER,
  MEMORY,
  OPERATING_SYSTEM,
  STANDARD,
} from './consts';

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

export function supplementProductName(productName: string, specifications: ISpecification[]): string {
  const prefixedAttributes: string[] = [MANUFACTURER];
  const attributesToGet: string[] = [MEMORY, DISPLAY_SIZE, OPERATING_SYSTEM, STANDARD];
  const prefixes: string[] = [];
  const suffixes: string[] = [];
  prefixedAttributes.forEach((attributeKey) => {
    const attribute = specifications.find((spec) => spec.key === attributeKey);
    if (attribute) {
      prefixes.push(attribute.value);
    }
  });
  attributesToGet.forEach((attributeKey) => {
    const attribute = specifications.find((spec) => spec.key === attributeKey);
    if (attribute) {
      suffixes.push(attribute.value);
    }
  });
  return `${prefixes.join(' ')} ${productName} ${suffixes.join(' ')}`;
}

export function listProductAttributes(specifications: ISpecification[]): string {
  const attributesToGet: string[] = ['Memory', 'Display size (in)', 'Operating system', 'Standard'];
  const attributes: string[] = [];
  attributesToGet.forEach((attributeKey) => {
    const attribute = specifications.find((spec) => spec.key === attributeKey);
    if (attribute) {
      attributes.push(attribute.value);
    }
  });
  return `${attributes.join(' ')}`;
}

export function calcPriceAfterDiscounts(price: number, discount?: number): number {
  let calculatedPrice = price * 0.01;
  if (discount) {
    calculatedPrice -= (calculatedPrice * (discount * 0.01));
  }
  return calculatedPrice;
}
