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
    setBreadcrumbs(breadCrumbs: BreadCrumb[]) {
      this.breadCrumbs = [{ name: 'Home', to: '/' }, ...breadCrumbs]
    },
  },
})
