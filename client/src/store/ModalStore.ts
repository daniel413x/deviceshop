import { makeAutoObservable } from 'mobx';

export default class ModalStore {
  modals: string[];

  constructor() {
    this.modals = [];
    makeAutoObservable(this);
  }

  queue(id: string) {
    this.modals = [...this.modals, id];
  }

  unqueue(removedId: string) {
    this.modals = this.modals.filter((id) => id !== removedId);
  }

  noModals() {
    return this.modals.length === 0;
  }

  get all() {
    return this.modals;
  }
}
