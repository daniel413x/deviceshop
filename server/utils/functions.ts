import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { fileExtensionRegex } from './consts';

export function toFilename(string: string) {
  const splitName = string.split('/');
  return splitName[splitName.length - 1];
}

export function assignBodyAndHandleStringImageAttribute(req: Request, attribute: string, updatedObj?: any) {
  const { body, files } = req;
  if (!files) {
    return body;
  }
  const file = files[Object.keys(files)[0]] as UploadedFile;
  const fileName = file.name;
  const fileExtension = fileName.match(fileExtensionRegex)[0];
  let create: boolean;
  if (updatedObj) {
    create = updatedObj[attribute] === 'default-avatar.jpg';
  }
  const savedFileName = create ? `${uuidv4()}.${fileExtension}` : fileName;
  file.mv(path.resolve(__dirname, '..', 'static', savedFileName));
  body[attribute] = savedFileName;
  return body;
}

export function assignBodyAndHandleImagesArrayAttribute(req: Request, updatedArr?: string[]) {
  const { body, files } = req;
  body.images = updatedArr || []; // default assignment assumes model has string[] attribute to store images
  if (!files) {
    return body;
  }
  const filesKeys = Object.keys(files);
  for (let k = 0; k < filesKeys.length; k += 1) {
    const file = files[filesKeys[k]] as UploadedFile;
    const fileExtension = file.name.match(fileExtensionRegex)[0];
    let fileName = toFilename(filesKeys[k]);
    let create = true;
    if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
      if (updatedArr) { // block checks if file can be overwritten in /static
        for (let i = 0; i < body.images.length; i += 1) {
          const updateImage = body.images[i] === fileName;
          if (updateImage) {
            file.mv(path.resolve(__dirname, '..', 'static', fileName));
            create = false;
            break;
          }
        }
      }
      if (create) {
        fileName = `${uuidv4()}.${fileExtension}`;
        body.images = [...body.images, fileName];
        file.mv(path.resolve(__dirname, '..', 'static', fileName));
      }
    }
    // if (fileExtension === ...) {...
  }
  return body;
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
