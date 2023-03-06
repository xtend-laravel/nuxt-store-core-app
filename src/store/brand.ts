import { defineStore } from 'pinia'
import useStoreInventory from '../composables/useStoreInventory'
import { LocaleField } from '~/types/locale'
export interface Brand {
  id: number
  name: LocaleField
  description: LocaleField
  attributes: any
  relationships: any
  image: string
  sortBy: string
  children: Brand[]
}

export interface BrandState {
  brand: any
}

export const useBrandStore = defineStore({
  id: 'brand',

  state: (): BrandState => ({
    brand: {},
  }),

  getters: {
    currentBrand(): Brand {
      return this.brand
    },
  },

  actions: {
    async fetch(brandId: number): Promise<Brand> {
      const { data } = await useStoreInventory({
        type: 'brands',
        routeMatch: '[id]',
        params: { id: brandId },
      })
      this.setCurrentBrand(data)
      return data
    },
    async allBrands(): Promise<Brand[]> {
      const { data } = await useStoreInventory({
        type: 'brands',
      })
      return data
    },
    setCurrentBrand(brand: Brand) {
      this.brand = brand
    },
  },
})
