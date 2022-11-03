import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { UploadedFile } from 'express-fileupload';

// eslint-disable-next-line import/prefer-default-export
export function assignBodyAndProcessImages(req: Request) {
  const { body, files } = req;
  const filesKeys = Object.keys(files);
  for (let k = 0; k < filesKeys.length; k += 1) {
    if (/img/.test(filesKeys[k])) {
      const imgProperty = filesKeys[k].substring(3).replace(/^\D/, (c) => c.toLowerCase());
      const fileName = `${uuidv4()}.jpg`;
      body[imgProperty] = fileName;
      const img = files[filesKeys[k]] as UploadedFile;
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      break;
    }
  }
  return body;
}

export function calcItemPrice(price: number, discount?: number) {
  let returnedPrice = price;
  if (discount) {
    returnedPrice = ((price) * (1000 - (discount * 1000)));
    returnedPrice *= 0.001;
  }
  return returnedPrice.toFixed(2);
}

export function calcTotal(arr: any) {
  let total = 0;
  if (arr.length === 0) {
    return total;
  }
  arr.forEach((foodItem) => {
    const { quantity, discount, price } = foodItem;
    const itemTotal = calcItemPrice(price! * quantity!, discount);
    total += Number(itemTotal) * 1000;
  });
  return total * 0.001;
}
