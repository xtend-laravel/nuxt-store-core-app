import { defineStore } from 'pinia'
import type { UnwrapRef } from 'vue'
import useApi from '#nuxt-store-core/composables/useApi'

interface Product {
  id: number
  quantity: number
  total: number
  product: {}
  purchasable: string
}

export interface LatestOrder {
  id: number
  created_at: string
  total: number
  products: Product[]
}

export interface Stats {
  orders: number
  wishlist: {
    added_total: number
    added_recently: number
  }
  total_spent: number
}

interface CartState {
  _stats: Stats
  _latest_order: LatestOrder | null
}

export const useAccountDashboardStore = defineStore({
  id: 'accountDashboard',

  state: (): CartState => ({
    _stats: {
      orders: 0,
      wishlist: {
        added_total: 0,
        added_recently: 0,
      },
      total_spent: 0,
    },
    _latest_order: null,
  }),

  getters: {
    stats(): UnwrapRef<CartState['_stats']> {
      return this._stats
    },

    latestOrder(): UnwrapRef<CartState['_latest_order']> {
      return this._latest_order
    },
  },

  actions: {
    async fetch(): Promise<void> {
      const { data } = await useApi({
        endpoint: 'customers/account',
        requiresAuth: true,
        action: 'custom',
        method: 'GET',
      })

      this.setStats(data.stats)
      this.setLatestOrder(data.latest_order)
    },
    setStats(stats: Stats): void {
      this._stats = stats
    },
    setLatestOrder(latestOrder: LatestOrder): void {
      this._latest_order = latestOrder
    },
  },
})
