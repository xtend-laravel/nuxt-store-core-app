import {defineStore} from 'pinia'
import useFilter from '../composables/useFilter'

export interface FilterState {
  _brandIds: Array<number>
  _categoryIds: Array<number>
  _priceRange: Array<number>
  _availableColorIds: Array<number>
  _availableSizeIds: Array<number>
  _filterQueryString: string
}

interface FilterCriteria {
  param: string
  values: Array<number>
}

export const useFilterStore = defineStore({
  id: 'filters',

  state: (): FilterState => ({
    _brandIds: [],
    _categoryIds: [],
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
    priceRange(): Array<number> {
      return this._priceRange
    },
    availableColorIds(): Array<number> {
      return this._availableColorIds
    },
    availableSizeIds(): Array<number> {
      return this._availableSizeIds
    },
  },

  actions: {
    async apply(): Promise<FilterState> {
      this.buildFilterQueryString()
      const { data } = await useFilter('products', this._filterQueryString)
      return data
    },
    buildFilterQueryString(): void {
      const filterCriteria: FilterCriteria[] = [
        { param: 'brandIds', values: this.brandIds },
        { param: 'categoryIds', values: this.categoryIds },
        { param: 'priceRange', values: this.priceRange },
        { param: 'availableColorIds', values: this.availableColorIds },
        { param: 'availableSizeIds', values: this.availableSizeIds },
      ]

      this._filterQueryString = filterCriteria
        .filter((criteria: FilterCriteria) => criteria.values.length > 0)
        .map((criteria: FilterCriteria) => `&${criteria.param}=${criteria.values.join(',')}`)
        .join('')
    },
    setBrandIds(ids: Array<number>) {
      this._brandIds = ids
    },
    setCategoryIds(ids: Array<number>) {
      this._categoryIds = ids
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
