import { defineStore } from 'pinia'
import useFilter from '../composables/useFilter'
import { useProductListStore } from './productList'

export interface FilterState {
  _filterGroups: any
  _currentGroup: string | null
  _initialCategoryId: number | null
  _brandIds: Array<number>
  _categoryIds: Array<number>
  _keyword: string
  _priceRange: Array<number>
  _availableColorIds: Array<number>
  _availableSizeIds: Array<number>
  _filterNewestOnly: boolean
  _filterSaleOnly: boolean
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
    _filterGroups: {},
    _currentGroup: null,
    _initialCategoryId: null,
    _brandIds: [],
    _categoryIds: [],
    _keyword: '',
    _priceRange: [],
    _availableColorIds: [],
    _availableSizeIds: [],
    _filterNewestOnly: false,
    _filterSaleOnly: false,
    _filterQueryString: '',
  }),

  getters: {
    filterGroups(): any {
      return this._filterGroups
    },
    currentGroup(): string | null {
      return this._currentGroup
    },
    initialCategoryId(): number | null {
      return this._initialCategoryId
    },
    brandIds(): Array<number> {
      return this._brandIds
    },
    categoryIds(): Array<number> {
      return this._categoryIds
    },
    keyword(): string {
      return this._keyword
    },
    colorGroup(): any {
      return Object.keys(this._filterGroups).find((group: string) => group === 'colors')
    },
    sizeGroup(): any {
      return Object.keys(this._filterGroups).find((group: string) => group === 'sizes')
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
    filterNewestOnly(): boolean {
      return this._filterNewestOnly
    },
    filterSaleOnly(): boolean {
      return this._filterSaleOnly
    },
    filterQueryString(): string {
      return this._filterQueryString
    },
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

      if (this.currentGroup) {
        this._filterQueryString = `&currentGroup=${this.currentGroup}${this._filterQueryString}`
      }

      if (this.filterNewestOnly) {
        this._filterQueryString = `&newestOnly=1${this._filterQueryString}`
      }

      if (this.filterSaleOnly) {
        this._filterQueryString = `&saleOnly=1${this._filterQueryString}`
      }

      const currentPage = useProductListStore().currentPage
      if (currentPage >= 1) {
        this._filterQueryString = `&page=${currentPage}${this._filterQueryString}`
      }

      const sortBy = useProductListStore().sortBy
      if (sortBy !== 'new') {
        this._filterQueryString = `&sort=${sortBy}${this._filterQueryString}`
      }
    },
    updateProductListStore(data: any, meta: any, options: IApplyOptions): void {
      useProductListStore().setMeta(meta)

      options.onScroll ? useProductListStore().appendItems(data) : useProductListStore().setItems(data, options.init)
    },
    setFilterGroups(groups: any) {
      this._filterGroups = groups
    },
    setCurrentGroup(group: any) {
      this._currentGroup = group
    },
    setInitialCategoryId(id: number) {
      this._initialCategoryId = id
    },
    setBrandIds(ids: Array<number>) {
      this._brandIds = ids
      this.setCurrentGroup(ids.length > 0 ? 'brands' : null)
    },
    setCategoryIds(ids: Array<number>) {
      if (ids.length === 0 && this._initialCategoryId) {
        this._categoryIds = [this._initialCategoryId]
        return
      }
      this._categoryIds = ids
      this.setCurrentGroup(ids.length > 0 ? 'categories' : null)
    },
    setKeyword(keyword: string) {
      this._keyword = keyword
      this.setCurrentGroup(keyword.length ? 'keyword' : null)
    },
    setPriceRange(range: Array<number>) {
      this._priceRange = range
      this.setCurrentGroup('price')
    },
    setAvailableColorIds(ids: Array<number>) {
      this._availableColorIds = ids
      this.setCurrentGroup(ids.length > 0 ? 'colors' : null)
    },
    setAvailableSizeIds(ids: Array<number>) {
      this._availableSizeIds = ids
      this.setCurrentGroup(ids.length > 0 ? 'sizes' : null)
    },
    setFilterNewestOnly() {
      this._filterSaleOnly = false
      this._filterNewestOnly = true
    },
    setFilterSaleOnly() {
      this._filterNewestOnly = false
      this._filterSaleOnly = true
    },
  },
})
