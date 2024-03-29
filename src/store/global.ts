import { defineStore } from 'pinia'
import useRepositoryAction from '../composables/useRepository'
import type { IEntity } from '../types/repository'

export interface GlobalState {
  favorites: number[]
}

export const useGlobalStore = defineStore({
  id: 'global',
  state: (): GlobalState => ({
    favorites: [],
  }),
  actions: {
    async persistEntity(options: IEntity): Promise<any> {
      const { data } = await useRepositoryAction(options)
      return data
    },
    toggleFavorite(id: number) {
      this.favorites = this.favorites.includes(id)
        ? this.favorites.filter((item) => item !== id)
        : [...this.favorites, id]
    },
  },
})
