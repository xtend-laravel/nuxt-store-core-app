import { defineStore } from 'pinia'
import type { Product } from '@/store/products'
import { useProductStore } from '@/store/products'
export interface Category {
  id: number
  title: string
  description: string
  image: string
  sortBy: string
}

export interface Filters {
  categoryIds: Array<number>
  priceRange: Array<number>
  availableColorIds: Array<string>
  availableSizeIds: Array<string>
}

interface CategoryState {
  category: Category
  filters: Filters
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
    filters: <Filters>{
      categoryIds: [],
      priceRange: [],
      availableColorIds: [],
      availableSizeIds: [],
    },
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
    async fetch() {
      // @todo - Later we will fetch category data from Laravel API search by slug
      this.category = <Category>{}
    },
  },
})
