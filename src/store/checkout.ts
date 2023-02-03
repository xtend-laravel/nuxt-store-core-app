import { defineStore } from 'pinia'
import { UnwrapRef } from 'vue'
import { CHECKOUT_STORAGE } from '~/composables/usePersistCheckout'

export interface Checkout {
  steps: Array<string>
  currentStep: string
  summary: Record<string, string>
  paymentMethod: string
  shippingMethod: string
  shippingAddress: Record<string, string>
  billingAddress: Record<string, string>
}

interface CheckoutState {
  contents: Record<string, Checkout>
}

export const useCheckoutStore = defineStore({
  id: 'checkout',

  state: (): CheckoutState => ({
    contents: JSON.parse(localStorage.getItem(CHECKOUT_STORAGE) as string) ?? {},
  }),

  getters: {
    getCheckout(): UnwrapRef<CheckoutState['contents']> {
      return this.contents
    },
    getCheckoutItems(): Array<Checkout> {
      return Object.values(this.contents)
    },
    getCheckoutItemsCount(): number {
      return Object.values(this.contents).length
    },
  },

  actions: {
    // @todo - Later we will fetch checkout data from Laravel API
  },
})
