import { defineStore } from 'pinia'

export interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
  image: string
  hasFlag: boolean
  flag: {
    label: string
    color?: string
    discount?: number
  }
  route: string
}

interface ProductState {
  items: Record<string, Product>
  ids: number[]
}

export const useProductStore = defineStore({
  id: 'products',

  state: (): ProductState => ({
    items: {},
    ids: [],
  }),

  getters: {
    list(): Product[] {
      return this.ids.map(i => this.items[i])
    },
    loaded(): boolean {
      return this.ids.length > 0
    },
  },

  actions: {
    async fetchAll() {
      if (this.loaded)
        return

      const data: any = await fetch('/products.json').then(res => res.json())
      this.ids = data.map((product: any) => {
        product.hasFlag = true
        product.flag = this.getRandomFlag()
        product.route = `/product/${product.id}`
        this.items[product.id] = product
        return product.id
      })
    },
    // @todo This could be moved to a separate store once we pull these values down via the API but ok here for now
    getRandomFlag() {
      const flags = [
        { label: 'New', color: 'blue' },
        { label: 'Sale', color: 'red', discount: 10 },
        { label: 'Hot', color: 'orange' },
      ]
      return flags[Math.floor(Math.random() * flags.length)]
    },
  },
})
