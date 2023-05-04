import { defineStore } from 'pinia'
import useStoreInventory from '../composables/useStoreInventory'
import type { LocaleField } from '~/types/locale'

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
    async fetch(categoryId: number, queryString?: string): Promise<Category> {
      const { data } = await useStoreInventory({
        type: 'categories',
        routeMatch: '[id]',
        params: { id: categoryId },
        query: queryString,
      })
      this.setCurrentCategory(data)
      return data
    },
    setCurrentCategory(category: Category) {
      this.category = category
    },
  },
})
