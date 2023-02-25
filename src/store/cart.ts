import { defineStore } from 'pinia'
import type { UnwrapRef } from 'vue'
import { useGlobalStore } from '~/store/global'
import useCheckout from "~/composables/useCheckout";

export interface Purchase {
  id: number
  productId: number
  quantity: number
  purchasable?: any
  total?: number
}

interface CartState {
  _cartId: number
  _products: Record<number, Purchase>
  _totals: Record<string, number>
}

export const useCartStore = defineStore({
  id: 'cart',

  state: (): CartState => ({
    _cartId: 0,
    _products: {},
    _totals: {},
  }),

  getters: {
    isCartEmpty(): boolean {
      return Object.keys(this._products).length === 0
    },
    cartId(): UnwrapRef<CartState['_cartId']> {
      return this._cartId
    },
    products(): UnwrapRef<CartState['_products']> {
      return this._products
    },
    totals(): UnwrapRef<CartState['_totals']> {
      return this._totals
    },
  },

  actions: {
    async fetch(): Promise<void> {
      const { data: { cart } } = await useCart()
      const products: Record<number, Purchase> = {}
      cart.products.forEach((product: Purchase) => {
        const id: number = product.id || product.productId
        products[id] = product
      })

      this.setCartId(cart.id)
      this.setProducts(products)
      this.setTotals(cart.totals)
    },
    setCartId(cartId: number): void {
      this._cartId = cartId
    },
    setProducts(products: Record<number, Purchase>): void {
      this._products = products
    },
    setTotals(totals: Record<string, number>): void {
      this._totals = totals
    },
    async persistCartData(productId: number, currentQuantity: number): Promise<any> {
      return useGlobalStore()
        .persistEntity({
          repository: 'carts',
          action: 'update',
          method: 'POST',
          data: {
            cartId: this._cartId,
            product: {
              id: productId,
              quantity: currentQuantity || 1,
            },
          },
        })
    },
    async add(productId: number, quantity = 1): Promise<any> {
      return await this.persistCartData(productId, quantity).then(async (response: any) => {
        this._products[productId] = response
      })
    },
    async remove(productId: number): Promise<any> {
      this._products[productId]?.quantity > 0
        ? (this._products[productId].quantity -= 1)
        : delete this._products[productId]

      return await this.persistCartData(productId, -1)
    },
  },
})
