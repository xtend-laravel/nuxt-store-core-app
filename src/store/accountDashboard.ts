import { defineStore } from 'pinia'
import type { UnwrapRef } from 'vue'
import useApi from '../composables/useApi'

interface Product {
  id: number
  quantity: number
  total: number
  product: {}
  purchasable: string
}

interface LatestOrder {
  products: Product[]
}

export interface Stats {
  orders: number
  points_earned: number
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
      points_earned: 0,
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
