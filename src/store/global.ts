import { defineStore } from 'pinia'

export interface BreadCrumb {
  name: string
  to?: string
}

export interface GlobalState {
  breadCrumbs: BreadCrumb[]
}

export const useGlobalStore = defineStore({
  id: 'global',
  state: (): GlobalState => ({
    breadCrumbs: [
      { name: 'Home', to: '/' },
    ],
  }),
  actions: {
    pushBreadCrumbs(breadCrumbs: BreadCrumb[]) {
      this.breadCrumbs = [...this.breadCrumbs, ...breadCrumbs]
    },
  },
})
