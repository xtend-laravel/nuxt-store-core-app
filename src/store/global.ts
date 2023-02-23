import { defineStore } from 'pinia'
import type { IEntity } from '~/types/repository'
import useRepositoryAction from '~/composables/useRepository'

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
    async persistEntity(options: IEntity): Promise<any> {
      const { data } = await useRepositoryAction(options)
      return data
    },
  },
})
