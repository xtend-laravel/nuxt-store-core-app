import { defineStore } from 'pinia'
import useRepositoryAction from '../composables/useRepository'
import type { IEntity } from '~/types/repository'

export interface BreadCrumb {
  name: string
  to?: string
}

export interface GlobalState {
  breadCrumbs: BreadCrumb[]
  favorites: number[]
}

export const useGlobalStore = defineStore({
  id: 'global',
  state: (): GlobalState => ({
    breadCrumbs: [
      { name: 'Home', to: '/' },
    ],
    favorites: [],
  }),
  actions: {
    setBreadcrumbs(breadCrumbs: BreadCrumb[]) {
      this.breadCrumbs = [{ name: 'Home', to: '/' }, ...breadCrumbs]
    },
    async persistEntity(options: IEntity): Promise<any> {
      const { data } = await useRepositoryAction(options)
      return data
    },
    addToFavorite(id: number) {
      this.favorites = [...this.favorites, id]
    },
  },
})
