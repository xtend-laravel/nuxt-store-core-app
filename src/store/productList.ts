import { defineStore } from 'pinia'
import useStoreInventory from '../composables/useStoreInventory'

export type ProductListLayout = 'grid' | 'list'

export interface ProductListState {
  _page: number
  _meta: any
  _sortBy: string
  _initialItems: any
  _items: any
  _ids: number[]
  _layout: ProductListLayout
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
    _sortBy: 'new',
    _initialItems: [],
    _items: [],
    _ids: [],
    _layout: 'grid',
  }),
  getters: {
    countItems: (state: ProductListState): number => state._meta.total,
    currentPage: (state: ProductListState): number => state._page,
    items: (state: ProductListState) => state._items,
    meta: (state: ProductListState) => state._meta,
    sortBy: (state: ProductListState) => state._sortBy,
    layout: (state: ProductListState) => state._layout,
  },
  actions: {
    async fetch(entity: string, id?: number, queryString?: string): Promise<void> {
      const { data } = await useStoreInventory({
        type: entity,
        routeMatch: '[id]',
        params: { id },
        query: queryString,
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
    setItems(items: any, init = false): void {
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
    setSortBy(sortBy: string): void {
      this._sortBy = sortBy
    },
    setLayout(layout: ProductListLayout): void {
      this._layout = layout
    },
  },
})
