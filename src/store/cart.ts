import { defineStore } from 'pinia'
import type { UnwrapRef } from 'vue'
import useCart from '../composables/useCart'
import { useGlobalStore } from './global'

export interface Purchase {
  id: number
  productId: number
  quantity: number
  product?: any
  purchasable?: any
  total?: number
}

interface CartState {
  _cartId: number
  _lastAddedLineId: number
  _products: Purchase[]
  _totals: Record<string, number>
  _meta: Record<string, any>
}

export const useCartStore = defineStore({
  id: 'cart',

  state: (): CartState => ({
    _cartId: 0,
    _lastAddedLineId: 0,
    _products: [],
    _totals: {},
    _meta: {},
  }),

  getters: {
    isCartEmpty(): boolean {
      return this._products.length === 0
    },
    cartId(): UnwrapRef<CartState['_cartId']> {
      return this._cartId
    },
    items(): UnwrapRef<CartState['_products']> {
      return this._products
    },
    async lastAddedItem(): Promise<any> {
      return await this._products.find((item) => item.id === this._lastAddedLineId)
    },
    cartCount(): number {
      return this._products.length
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
      this.setProducts(cart.products)
      this.setTotals(cart.totals)
      this.setMeta(cart.meta)
    },
    setCartId(cartId: number): void {
      this._cartId = cartId
    },
    setProducts(products: Purchase[]): void {
      this._products = products
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
    // @todo Later this should be changed to lineId and the API updated to match
    async persistCartData(productId: number, currentQuantity: number, variants?: object): Promise<any> {
      return useGlobalStore().persistEntity({
        repository: 'carts',
        action: 'update',
        method: 'POST',
        data: {
          cartId: this._cartId,
          product: {
            id: productId,
            quantity: currentQuantity || 1,
            variants,
          },
        },
      })
    },
    async add(productId: number, quantity = 1, variants?: object): Promise<any> {
      await this.persistCartData(productId, quantity, variants)
      await this.fetch()
      return Promise.resolve()
    },
    async remove(productId: number): Promise<any> {
      this._products[productId]?.quantity > 0
        ? (this._products[productId].quantity -= 1)
        : delete this._products[productId]

      return await this.persistCartData(productId, -1)
    },
    async removeLine(lineId: number): Promise<any> {
      const response = await fetch(`/api/carts/remove-line`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartId: this._cartId, lineId }),
      })

      if (!response.ok) {
        throw new Error('Failed to remove line.')
      }

      await this.fetch()
    },

    async updateQuantity(lineId: number, quantity: number): Promise<any> {
      const response = await fetch(`/api/carts/update-line-quantity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartId: this._cartId, lineId, quantity }),
      })

      if (!response.ok) {
        throw new Error('Failed to update quantity.')
      }

      await this.fetch()
    },
  },
})
