import { defineStore } from 'pinia'

export interface FilterState {
  _categoryIds: Array<number>
  _priceRange: Array<number>
  _availableColorIds: Array<string>
  _availableSizeIds: Array<string>
}

export const useFilterStore = defineStore({
  id: 'filters',

  state: (): FilterState => ({
    _categoryIds: [],
    _priceRange: [],
    _availableColorIds: [],
    _availableSizeIds: [],
  }),

  getters: {
    categoryIds(): Array<number> {
      return this._categoryIds
    },
    priceRange(): Array<number> {
      return this._priceRange
    },
    availableColorIds(): Array<string> {
      return this._availableColorIds
    },
    availableSizeIds(): Array<string> {
      return this._availableSizeIds
    },
  },

  actions: {
    setCategoryIds(ids: Array<number>) {
      this._categoryIds = ids
    },
    setPriceRange(range: Array<number>) {
      this._priceRange = range
    },
    setAvailableColorIds(ids: Array<string>) {
      this._availableColorIds = ids
    },
    setAvailableSizeIds(ids: Array<string>) {
      this._availableSizeIds = ids
    },
  },
})
