import { defineStore } from 'pinia'
import useStoreInventory from '../composables/useStoreInventory'
import type { ProductState } from './products'
import { useProductStore } from './products'

const originalProductStore = useProductStore()

interface ExtendProductState extends ProductState {}
export const useExtendedProductStore = defineStore({
  id: 'extended-product',
  state: (): ExtendProductState => <ExtendProductState>{},
  getters: {
    currentProduct: (): any => originalProductStore.$state.currentProduct,
  },
  actions: {
    async fetch(productId: number): Promise<void> {
      const { data } = await useStoreInventory({
        type: 'products',
        routeMatch: '[id]',
        params: { id: productId },
        query: 'related=primaryCategory',
      })

      originalProductStore.$state.currentProduct = data

      return data
    },
  },
})
