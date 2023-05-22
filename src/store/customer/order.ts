import { defineStore } from 'pinia'
import type { UnwrapRef } from 'vue'
import useApi from '#nuxt-store-core/composables/useApi'

export type Status = 'awaiting-payment' | 'payment-offline' | 'payment-received' | 'dispatched'

interface Product {
  id: number
  quantity: number
  total: number
  product: {}
  purchasable: string
}

interface Totals {
  sub_total: number
  shipping_total: number
  discount_total: number
  tax_total: number
  total: number
}

export interface Address {
  id: number
  first_name: string
  last_name: string
  company_name: string | null
  line_one: string | null
  line_two: string | null
  line_three: string | null
  city: string
  state: string
  postcode: string
  country: string
  contact_email: string | null
  contact_phone: string | null
}

export interface Order {
  id: number
  created_at: string
  total: number
  payment: string
  status: Status
  products: Product[]
  addresses: {
    billing: Address
    shipping: Address
  }
  totals: Totals
}

interface CartState {
  _order: Order
}

export const useAccountOrderStore = defineStore({
  id: 'customerOrder',

  state: (): CartState => ({
    _order: null,
  }),

  getters: {
    order(): UnwrapRef<CartState['_order']> {
      return this._order
    },
  },

  actions: {
    async fetch(orderId: number | string): Promise<void> {
      const { data } = await useApi({
        endpoint: `customers/account/orders/${orderId}`,
        requiresAuth: true,
        action: 'show',
        method: 'GET',
      })

      this.setOrder(data)
    },
    setOrder(order: Order): void {
      this._order = order
    },
  },
})
