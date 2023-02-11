import { defineStore } from 'pinia'
import useStoreInventory from '../composables/useStoreInventory'
import type { FilterState } from '@/store/filters'
import type { Product } from '@/store/products'
import { useProductStore } from '@/store/products'

export interface Category {
  id: number
  title: string
  description: string
  image: string
  sortBy: string
}

export interface CategoryState {
  category: Category
  filters: FilterState
  products: Record<string, Product>
}

export const useCategoryStore = defineStore({
  id: 'category',

  state: (): CategoryState => ({
    category: <Category>{
      id: 0,
      title: '',
      description: '',
      image: '',
      sortBy: '',
    },
    filters: <FilterState>{},
    products: useProductStore().items,
  }),

  getters: {
    currentCategory(): Category {
      return this.category
    },
    products(): Record<string, Product> {
      return useProductStore().items
    },
    productsCount(): number {
      return Object.keys(this.products).length
    },
  },

  actions: {
    async fetch(categoryId: number) {
      const { data } = await useStoreInventory({
        type: 'category',
        routeMatch: '[id]',
        params: { id: categoryId },
      })
      this.setCurrentCategory(data)
    },
    setCurrentCategory(category: any) {
      this.category = category
    },
  },
})
