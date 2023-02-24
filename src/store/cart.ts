import { defineStore } from 'pinia'
import { useProductStore } from './products'
import usePersistForm from "~/composables/usePersistForm";
import {useGlobalStore} from "~/store/global";

export interface Purchase {
  productId: number
  quantity: number
}

interface CartState {
  cartId: number
  products: Record<string, Purchase>
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
    products: JSON.parse(<any>localStorage.getItem('cartProducts')) || {},
  }),

  getters: {
    // count(): number {
    //   return Object.keys(this.products).reduce((acc, id) => {
    //     return acc + this.products[id].quantity
    //   }, 0)
    // },
    //
    // total(): number {
    //   const products = useProductStore()
    //   return Object.keys(this.products).reduce((acc, id) => {
    //     return acc + products.items[id].price * this.products[id].quantity
    //   }, 0)
    // },
    //
    // formattedCart(): CartPreview[] {
    //   const products = useProductStore()
    //
    //   if (!products.loaded)
    //     return []
    //
    //   return Object.keys(this.products).map((productId) => {
    //     const purchase = this.products[productId]
    //
    //     return {
    //       id: purchase.productId,
    //       image: products.items[purchase.productId].image,
    //       title: products.items[purchase.productId].name,
    //       quantity: purchase.quantity,
    //       cost: purchase.quantity * products.items[purchase.productId].price,
    //     }
    //   })
    // },
  },

  actions: {
    async fetch(): Promise<void> {
      const { data } = await useCart()
      console.log(data)

      this.cartId = data.cart.id
      if (data.items) {
        localStorage.setItem('cartProducts', JSON.stringify(data.items))
      }
    },
    async add(productId: number) {
      this.products[productId] = {
        productId,
        quantity: (this.products[productId]?.quantity ?? 0) + 1,
      }

      return await useGlobalStore()
        .persistEntity({
          repository: 'carts',
          action: 'update',
          method: 'POST',
          data: {
            cartId: this.cartId,
            products: this.products,
          },
        })
        .then((response: any) => console.log('response', response))
    },
    remove(productId: number): void {
      this.products[productId]?.quantity > 0
        ? (this.products[productId].quantity -= 1)
        : delete this.products[productId]
    },
  },
})
