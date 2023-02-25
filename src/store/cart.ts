import { defineStore } from 'pinia'
import type { UnwrapRef } from 'vue'
import { useGlobalStore } from '~/store/global'

export interface Purchase {
  productId: number
  quantity: number
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
        products[product.productId] = product
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
    async persistCartData(data: any): Promise<any> {
      return useGlobalStore()
        .persistEntity({
          repository: 'carts',
          action: 'update',
          method: 'POST',
          data,
        })
        .then((response: any) => console.log('response', response))
    },
    async add(productId: number): Promise<any> {
      this._products[productId] = {
        productId,
        quantity: (this._products[productId]?.quantity ?? 0) + 1,
      }

      return await this.persistCartData({
        cartId: this._cartId,
        products: this._products,
      })
    },
    async remove(productId: number): Promise<any> {
      this._products[productId]?.quantity > 0
        ? (this._products[productId].quantity -= 1)
        : delete this._products[productId]

      return await this.persistCartData({
        cartId: this._cartId,
        products: this._products,
      })
    },
  },
})
