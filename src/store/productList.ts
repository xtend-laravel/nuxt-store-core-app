import { defineStore } from 'pinia'

export interface ProductListState {
  _page: number
  _meta: any
  _sortBy: string
  _initialItems: any
  _items: any
  _ids: number[]
}
interface iQueryParams {
  page: number
  sort: string
  filterBy?: string
}
export const useProductListStore = defineStore({
  id: 'product-list',
  state: (): ProductListState => ({
    _page: 1,
    _meta: {},
    _sortBy: 'name',
    _initialItems: [],
    _items: [],
    _ids: [],
  }),
  getters: {
    countItems: (state: ProductListState): number => state._meta.total,
    currentPage: (state: ProductListState): number => state._page,
    items: (state: ProductListState) => state._items,
    meta: (state: ProductListState) => state._meta,
    sortBy: (state: ProductListState) => state._sortBy,
  },
  actions: {
    async fetch(entity: string, id: number, queryParams: iQueryParams): Promise<void> {
      const { data } = await useStoreInventory({
        type: entity,
        routeMatch: '[id]',
        params: { id, queryParams },
      })
      return data
    },
    reset(): void {
      this._page = 1
      this._sortBy = 'name'
      this._items = this._initialItems
    },
    loadMore(): void {
      this._page++
    },
    appendItems(items: any): void {
      this._items = this._items.concat(items)
    },
    setInitialItems(items: any): void {
      this._initialItems = items
    },
    setItems(items: any, init: boolean = false): void {
      if (init) {
        this.setInitialItems(items)
      }
      this._items = items || this._initialItems
    },
    setMeta(meta: any): void {
      this._page = meta.current_page
      this._meta = meta
    },
    setPage(page: number): void {
      this._page = page
    },
  },
})
