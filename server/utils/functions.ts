import { Request } from 'express';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { fileExtensionRegex } from './consts';
import { ISpecification, ISpecificationCategory } from '../types/types';

export function getExtension(string: string) {
  return string.match(fileExtensionRegex)[0];
}

export function toFilename(string: string) {
  const splitName = string.split('/');
  return splitName[splitName.length - 1];
}

export async function writeImages(req: Request) {
  if (!req.files) {
    return;
  }
  const { files } = req;
  const fileKeys = Object.keys(files);
  await Promise.all(fileKeys.map(async (uuid) => { // if you generate uuid's on the client, then this is all you need to write the files
    const file = files[uuid] as UploadedFile;
    const filePath = path.resolve(__dirname, '..', 'static', uuid);
    await file.mv(filePath);
  }));
}

export function calcIntPrices(dollarPrice: number | string, discount?: number | string) {
  const price = Number(dollarPrice) * 100;
  let discountedPrice = Number(dollarPrice) * 100;
  if (discount) {
    discountedPrice -= (price * (Number(discount) / 100));
  }
  return {
    price,
    discountedPrice,
  };
}

export function flattenSpecifications(specificationCategories: ISpecificationCategory[]): ISpecification[] {
  const specifications: ISpecification[] = [];
  specificationCategories.forEach((cat) => {
    specifications.push(...cat.specifications);
  });
  return specifications;
}
