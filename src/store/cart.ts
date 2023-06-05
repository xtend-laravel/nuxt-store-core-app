import { defineStore } from 'pinia'
import type { UnwrapRef } from 'vue'
import useApi from '../composables/useApi'
import useCart from '../composables/useCart'
import type { LineItem } from '#nuxt-store-core/types/product'

interface CartState {
  _cartId: number
  _lastAddedLineId: number
  _items: LineItem[]
  _totals: Record<string, number>
  _meta: Record<string, any>
}

export const useCartStore = defineStore({
  id: 'cart',

  state: (): CartState => ({
    _cartId: 0,
    _lastAddedLineId: 0,
    _items: [],
    _totals: {},
    _meta: {},
  }),

  getters: {
    isCartEmpty(): boolean {
      return this._items.length === 0
    },
    cartId(): UnwrapRef<CartState['_cartId']> {
      return this._cartId
    },
    items(): UnwrapRef<CartState['_items']> {
      return this._items
    },
    lastAddedItem(): UnwrapRef<LineItem> | undefined {
      return this._items.find((item) => item.id === this._lastAddedLineId)
    },
    cartCount(): number {
      return this._items ? this._items.reduce((acc, item) => acc + item.quantity, 0) : 0
    },
    totals(): UnwrapRef<CartState['_totals']> {
      return this._totals
    },
    meta(): UnwrapRef<CartState['_meta']> {
      return this._meta
    },
  },

  actions: {
    async fetch(): Promise<void> {
      const {
        data: { cart },
      } = await useCart()

      this.setCartId(cart.id)
      this.setLastAddedLineId(cart.lastAddedLineId)
      this.setItems(cart.lineItems)
      this.setTotals(cart.totals)
      this.setMeta(cart.meta)
    },
    setCartId(cartId: number): void {
      this._cartId = cartId
    },
    setItems(lineItems: LineItem[]): void {
      this._items = lineItems
    },
    setLastAddedLineId(lineId: number): void {
      this._lastAddedLineId = lineId
    },
    setTotals(totals: Record<string, number>): void {
      this._totals = totals
    },
    setMeta(meta: Record<string, any>): void {
      this._meta = meta
    },
    async increaseQty(itemId: number, quantity: number): Promise<any> {
      return this.updateQty(itemId, quantity)
    },
    async decreaseQty(itemId: number, quantity: number): Promise<any> {
      return this.updateQty(itemId, quantity)
    },
    async updateQty(itemId: number, quantity = 1): Promise<any> {
      // @todo Improve remove endpoint add entity then if action allow public: or private: actions
      return await useApi({
        endpoint: `carts/${this._cartId}/public-actions?action=update-cart-line-action`,
        requiresAuth: false,
        action: 'update',
        method: 'POST',
        data: {
          lineId: itemId,
          quantity: quantity || 1,
        },
      })
    },
    async addToCart(productId: number, quantity = 1, variants?: object): Promise<any> {
      // @todo Improve remove endpoint add entity then if action allow public: or private: actions
      return await useApi({
        endpoint: `carts/${this._cartId}/public-actions?action=add-to-cart-action`,
        requiresAuth: false,
        action: 'create',
        method: 'POST',
        data: {
          cartId: this._cartId,
          product: {
            id: productId,
            quantity: quantity || 1,
            variants,
          },
        },
      })
    },
    async removeLine(lineId: number): Promise<any> {
      // @todo Improve remove endpoint add entity then if action allow public: or private: actions
      return await useApi({
        endpoint: `carts/${this._cartId}/public-actions?action=delete-cart-line-action`,
        requiresAuth: false,
        action: 'delete',
        method: 'POST',
        data: { cartId: this._cartId, lineId },
      })
    },

    async createOrder(): Promise<any> {
      // @todo Improve remove endpoint add entity then if action allow public: or private: actions
      return await useApi({
        endpoint: `carts/${this._cartId}/actions?action=create-order-action`,
        requiresAuth: true,
        action: 'create',
        method: 'POST',
        data: {
          ...this.meta,
        },
      })
    },

    async setAddress(type: string, id: number): Promise<any> {
      // @todo Improve remove endpoint add entity then if action allow public: or private: actions
      return await useApi({
        endpoint: `carts/${this._cartId}/actions?action=update-cart-address-action`,
        requiresAuth: true,
        action: 'update',
        method: 'POST',
        data: { cartId: this._cartId, type, id },
      })
    },
  },
})
