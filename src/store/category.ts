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
      // @todo - Later we will fetch category data from Laravel API search by slug
      this.category = <Category>{
        id: categoryId,
        title: `Category ${categoryId}`,
        description: `Category ${categoryId} description`,
        image: 'https://picsum.photos/200/300',
        sortBy: 'price',
      }
    },
  },
})
