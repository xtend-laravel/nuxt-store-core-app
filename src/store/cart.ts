import { defineStore } from 'pinia'
import { useProductStore } from './products'
import { CART_STORAGE } from '~/composables/usePersistCart'
import useCheckout from "~/composables/useCheckout";

export interface Purchase {
  productId: number
  quantity: number
}

interface CartState {
  cartId: number
  contents: Record<string, Purchase>
}

export interface CartPreview {
  id: number
  image: string
  title: string
  quantity: number
  cost: number
}

export const useCartStore = defineStore({
  id: 'cart',

  state: (): CartState => ({
    cartId: 0,
    contents: JSON.parse(<any>localStorage.getItem('cart')),
  }),

  getters: {
    count(): number {
      return Object.keys(this.contents).reduce((acc, id) => {
        return acc + this.contents[id].quantity
      }, 0)
    },

    total(): number {
      const products = useProductStore()
      return Object.keys(this.contents).reduce((acc, id) => {
        return acc + products.items[id].price * this.contents[id].quantity
      }, 0)
    },

    formattedCart(): CartPreview[] {
      const products = useProductStore()

      if (!products.loaded)
        return []

      return Object.keys(this.contents).map((productId) => {
        const purchase = this.contents[productId]

        return {
          id: purchase.productId,
          image: products.items[purchase.productId].image,
          title: products.items[purchase.productId].name,
          quantity: purchase.quantity,
          cost: purchase.quantity * products.items[purchase.productId].price,
        }
      })
    },
  },

  actions: {
    async fetch(): Promise<void> {
      const { data } = await useCart()
      console.log(data)
    },
    add(productId: number) {
      if (this.contents[productId]) {
        this.contents[productId].quantity += 1
      }
      else {
        this.contents[productId] = {
          productId,
          quantity: 1,
        }
      }
    },
    remove(productId: number) {
      if (!this.contents[productId])
        return

      this.contents[productId].quantity -= 1

      if (this.contents[productId].quantity === 0)
        delete this.contents[productId]
    },
  },
})
