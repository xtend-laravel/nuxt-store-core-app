import { defineStore } from 'pinia'
import type { Widget } from '../types/Widget'
import useWidgetCollection, { IWidgetCollection } from '../composables/useWidgetCollection'

interface BuilderState {
  route: string
  params?: Record<string, string>
  widgets: Widget[]
}

export const useBuilderStore = defineStore({
  id: 'builder',
  state: (): BuilderState => ({
    route: '',
    params: undefined,
    widgets: [],
  }),
  actions: {
    setRoute(route: string): void {
      this.route = route
    },
    setParams(params: Record<string, string> | undefined): void {
      this.params = params
    },
    setWidgets(widgets: Widget[]): void {
      this.widgets = widgets
    },
    async fetchWidgets(serve: any): Promise<void> {
      const options: IWidgetCollection = {
        type: 'store-component',
        route: this.route,
        params: this.params,
        splitTesting: serve,
      }
      const data = await useWidgetCollection(options)
      this.setWidgets(data)
    },
  },
})
