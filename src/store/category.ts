import { defineStore } from 'pinia'
import type { FilterState } from './filters'
import type { Product } from './products'
import { useProductStore } from './products'
import { LocaleField } from '~/types/locale'

export interface Category {
  id: number
  name: LocaleField
  description: LocaleField
  attributes: any
  relationships: any
  image: string
  sortBy: string
  children: Category[]
}

export interface CategoryState {
  category: any
}

export const useCategoryStore = defineStore({
  id: 'category',

  state: (): CategoryState => ({
    category: {},
  }),

  getters: {
    currentCategory(): Category {
      return this.category
    },
  },

  actions: {
    async fetch(categoryId: number): Promise<Category> {
      const { data } = await useStoreInventory({
        type: 'categories',
        routeMatch: '[id]',
        params: { id: categoryId },
      })
      this.setCurrentCategory(data)
      return data
    },
    setCurrentCategory(category: Category) {
      this.category = category
    },
  },
})
