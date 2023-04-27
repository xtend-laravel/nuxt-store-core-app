import { defineStore } from 'pinia'
import useFilter from '../composables/useFilter'
import { useProductListStore } from './productList'

export interface FilterState {
  _brandIds: Array<number>
  _categoryIds: Array<number>
  _keyword: string
  _priceRange: Array<number>
  _availableColorIds: Array<number>
  _availableSizeIds: Array<number>
  _filterQueryString: string
}

interface IApplyOptions {
  init?: boolean
  onScroll?: boolean
}

interface FilterCriteria {
  param: string
  values: Array<number | string>
}

export const useFilterStore = defineStore({
  id: 'filters',

  state: (): FilterState => ({
    _brandIds: [],
    _categoryIds: [],
    _keyword: '',
    _priceRange: [],
    _availableColorIds: [],
    _availableSizeIds: [],
    _filterQueryString: '',
  }),

  getters: {
    brandIds(): Array<number> {
      return this._brandIds
    },
    categoryIds(): Array<number> {
      return this._categoryIds
    },
    keyword(): string {
      return this._keyword
    },
    priceRange(): Array<number> {
      return this._priceRange
    },
    availableColorIds(): Array<number> {
      return this._availableColorIds
    },
    availableSizeIds(): Array<number> {
      return this._availableSizeIds
    },
    filterQueryString(): string {
      return this._filterQueryString
    }
  },

  actions: {
    async apply(options: IApplyOptions): Promise<any> {
      if (!options.onScroll) {
        useProductListStore().setPage(1)
      }
      this.buildFilterQueryString()
      const { data, meta } = await useFilter('products', this._filterQueryString)

      this.updateProductListStore(data, meta, options)
      return data
    },
    buildFilterQueryString(): void {
      const filterCriteria: FilterCriteria[] = [
        { param: 'brand_id', values: this.brandIds },
        { param: 'collection_id', values: this.categoryIds },
        { param: 'keyword', values: [this.keyword] },
        { param: 'price_range', values: this.priceRange },
        { param: 'availableColorIds', values: this.availableColorIds },
        { param: 'availableSizeIds', values: this.availableSizeIds },
      ]

      this._filterQueryString = filterCriteria
        .filter((criteria: FilterCriteria) => criteria.values.length > 0)
        .map((criteria: FilterCriteria) => `&${criteria.param}=${criteria.values.join(',')}`)
        .join('')

      const currentPage = useProductListStore().currentPage
      if (currentPage >= 1) {
        this._filterQueryString = `&page=${currentPage}${this._filterQueryString}`
      }

      const sortBy = useProductListStore().sortBy
      if (sortBy !== 'default') {
        this._filterQueryString = `&sort=${sortBy}${this._filterQueryString}`
      }
    },
    updateProductListStore(data: any, meta: any, options: IApplyOptions): void {
      useProductListStore().setMeta(meta)

      options.onScroll ? useProductListStore().appendItems(data) : useProductListStore().setItems(data, options.init)
    },
    setBrandIds(ids: Array<number>) {
      this._brandIds = ids
    },
    setCategoryIds(ids: Array<number>) {
      this._categoryIds = ids
    },
    setKeyword(keyword: string) {
      this._keyword = keyword
    },
    setPriceRange(range: Array<number>) {
      this._priceRange = range
    },
    setAvailableColorIds(ids: Array<number>) {
      this._availableColorIds = ids
    },
    setAvailableSizeIds(ids: Array<number>) {
      this._availableSizeIds = ids
    },
  },
})
