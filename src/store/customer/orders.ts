import { defineStore } from 'pinia'
import type { UnwrapRef } from 'vue'
import useApi from '#nuxt-store-core/composables/useApi'

export type Status = 'awaiting-payment' | 'payment-offline' | 'payment-received' | 'dispatched'

export interface Order {
  id: number
  created_at: string
  total: number
  payment: string
  status: Status
}

interface CartState {
  _orders: Order[]
}

export const useAccountOrdersStore = defineStore({
  id: 'customerOrders',

  state: (): CartState => ({
    _orders: [],
  }),

  getters: {
    orders(): UnwrapRef<CartState['_orders']> {
      return this._orders
    },
  },

  actions: {
    async fetch(): Promise<void> {
      const { data } = await useApi({
        endpoint: 'customers/account/orders',
        requiresAuth: true,
        action: 'index',
        method: 'GET',
      })

      this.setOrders(data.orders)
    },
    setOrders(orders: Order[]): void {
      this._orders = orders
    },
  },
})
