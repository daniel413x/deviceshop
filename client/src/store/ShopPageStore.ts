import { makeAutoObservable } from 'mobx';
import { fetchProducts } from '../http/shopProductAPI';
import {
  IShopProduct,
  SearchParamsRecord,
  QueryReqFetchMultipleShopProducts,
  SpecificationWithDeviceCount,
  Filter,
} from '../types/types';
import { objectHasProp } from '../utils/functions';

export default class ShopPageStore {
  loading: boolean;

  items: IShopProduct[];

  sorting: 'relevance' | 'byLowestPrice' | 'byHighestRated';

  view: 'list' | 'grid';

  count: number;

  itemsPerPage: number;

  filtersToToggle: SpecificationWithDeviceCount[];

  activeFilters: SpecificationWithDeviceCount[];

  page: number;

  constructor() {
    this.loading = true;
    this.itemsPerPage = 15;
    this.items = [];
    this.sorting = 'relevance';
    this.view = 'grid';
    this.count = 0;
    this.filtersToToggle = [];
    this.activeFilters = [];
    this.page = 1;
    makeAutoObservable(this);
  }

  setPage(page: number) {
    this.page = page;
  }

  setItems(arr: IShopProduct[], count: number) {
    this.items = arr;
    this.count = count;
  }

  handleChangeFiltersToToggle(specification: SpecificationWithDeviceCount) {
    const alreadyToggled = this.filtersToToggle.find((specificationToRemove) => specification.id === specificationToRemove.id);
    if (alreadyToggled) {
      this.filtersToToggle = this.filtersToToggle.filter((spec) => spec.id !== specification.id);
    } else {
      this.filtersToToggle = ([...this.filtersToToggle, specification]);
    }
  }

  resetFiltersToToggle() {
    this.filtersToToggle = [];
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

  changeSorting(string: 'relevance' | 'byLowestPrice' | 'byHighestRated') {
    this.sorting = string;
    this.fetchAndSortShopProducts();
  }

  createShopProductsQuery(page: number, limit: number): QueryReqFetchMultipleShopProducts {
    const query: QueryReqFetchMultipleShopProducts = {
      limit,
      page,
      order: {
        [this.sorting]: true,
      },
    };
    if (this.activeFilters.length > 0) {
      const specifications = this.activeFilters.map(({ key, value }) => ({
        key,
        value,
      }));
      query.filteredSearch = {
        specifications,
      };
    }
    return query;
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

  async fetchAndSetShopProducts(): Promise<void> {
    (async () => {
      try {
        this.loading = true;
        const { itemsPerPage } = this;
        const params = this.createShopProductsQuery(1, itemsPerPage);
        const res = await fetchProducts(params);
        this.setItems(res.rows, res.count);
      } finally {
        this.loading = false;
      }
    })();
  }

  async fetchMoreShopProducts(newPage: number): Promise<void> {
    (async () => {
      try {
        this.loading = true;
        const { itemsPerPage } = this;
        const params = this.createShopProductsQuery(newPage, itemsPerPage);
        const res = await fetchProducts(params);
        this.setItems([...this.items, ...res.rows], res.count);
      } finally {
        this.loading = false;
      }
    })();
  }

  async fetchAndSortShopProducts(): Promise<void> {
    (async () => {
      try {
        this.loading = true;
        const { itemsPerPage, page } = this;
        const params = this.createShopProductsQuery(1, itemsPerPage);
        params.limit = page * itemsPerPage;
        const res = await fetchProducts(params);
        this.setItems(res.rows, res.count);
      } finally {
        this.loading = false;
      }
    })();
  }
}
