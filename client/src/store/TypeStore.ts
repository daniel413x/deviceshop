import { makeAutoObservable } from 'mobx';
import {
  IType, SequelizeFindAndCountAll,
} from '../types/types';

export default class TypeStore {
  types: IType[];

  itemsInDb: number;

  constructor() {
    this.types = [];
    this.itemsInDb = 1;
    makeAutoObservable(this);
  }

  setTypes(fetchedData: SequelizeFindAndCountAll<IType>) {
    this.types = fetchedData.rows;
    this.itemsInDb = fetchedData.count;
  }

  findType(string: string) {
    const returnedType = this.types.find((type) => type.name === string);
    return returnedType;
  }
}
