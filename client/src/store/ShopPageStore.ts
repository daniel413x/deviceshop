import { makeAutoObservable } from 'mobx';
import {
  SearchParamsRecord,
  SpecificationWithDeviceCount,
  Filter,
} from '../types/types';
import { getFiltersFromSearchParamsRecord, objectHasProp } from '../utils/functions';

export default class ShopPageStore {
  view: 'list' | 'grid';

  filtersToToggle: SpecificationWithDeviceCount[];

  activeFilters: SpecificationWithDeviceCount[];

  constructor() {
    this.view = 'grid';
    this.filtersToToggle = [];
    this.activeFilters = [];
    makeAutoObservable(this);
  }

  handleChangeFiltersToToggle(specification: SpecificationWithDeviceCount) {
    const alreadyToggled = this.filtersToToggle.find((specificationToRemove) => specification.id === specificationToRemove.id);
    if (alreadyToggled) {
      this.filtersToToggle = this.filtersToToggle.filter((spec) => spec.id !== specification.id);
    } else {
      this.filtersToToggle = ([...this.filtersToToggle, specification]);
    }
  }

  toggleFilters() {
    this.filtersToToggle.forEach((argSpec) => {
      const argSpecLowerCased = { ...argSpec, key: argSpec.key.toLowerCase(), value: argSpec.value.toLowerCase() };
      if (!this.hasActiveFilter(argSpecLowerCased)) {
        this.activeFilters = [...this.activeFilters, argSpecLowerCased];
      } else {
        this.activeFilters = this.activeFilters.filter((removedSpec) => argSpecLowerCased.id !== removedSpec.id);
      }
    });
    this.filtersToToggle = [];
  }

  createSearchParamsRecordFromFilters() {
    const record: SearchParamsRecord = {};
    this.activeFilters.forEach(({ key, value }) => {
      const keyToLower = key;
      if (objectHasProp(record, keyToLower)) {
        record[keyToLower] = record[keyToLower].concat(`|${value}`);
      } else {
        record[keyToLower] = value;
      }
    });
    return record;
  }

  resetFilters() {
    this.activeFilters = [];
  }

  setFiltersFromSearchParams(obj: SearchParamsRecord) {
    const filters = getFiltersFromSearchParamsRecord(obj);
    this.activeFilters = filters.map((filter) => ({
      count: 0,
      value: filter.value,
      key: filter.key,
      id: `${filter.key}${filter.value}`,
    }));
  }

  removeFilter(id: string) {
    this.activeFilters = this.activeFilters.filter((spec) => id !== spec.id);
  }

  hasActiveFilter(argSpecification: SpecificationWithDeviceCount) {
    const found = this.activeFilters.find((thisSpecification) => thisSpecification.key === argSpecification.key.toLowerCase() && thisSpecification.value.includes(argSpecification.value.toLowerCase()));
    if (found) {
      return true;
    }
    return false;
  }

  willBeToggled(argSpecificationId: string) {
    const found = this.filtersToToggle.find((thisSpecification) => thisSpecification.id === argSpecificationId);
    if (found) {
      return true;
    }
    return false;
  }

  changeViewMode(string: 'list' | 'grid') {
    this.view = string;
  }

  createFiltersArray(specificationKey: string): Filter[] {
    const returnedArr: Filter[] = [];
    this.activeFilters.forEach(({ key, value }) => {
      if (key !== specificationKey.toLowerCase()) {
        returnedArr.push({
          key,
          value,
        });
      }
    });
    return returnedArr;
  }
}
