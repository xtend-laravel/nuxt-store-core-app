import { defineStore } from 'pinia'

export interface ProductListState {
  _page: number
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
    _sortBy: 'name',
    _initialItems: [],
    _items: [],
    _ids: [],
  }),
  getters: {
    items: (state: ProductListState) => state._items,
    countItems: (state: ProductListState): number => state._items.length,
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
    setInitialItems(items: any): void {
      this._initialItems = items
    },
    setItems(items: any, init: boolean): void {
      if (init) {
        this.setInitialItems(items)
      }
      this._items = items
    },
  },
})
