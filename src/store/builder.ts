import { defineStore } from 'pinia'
import type { Widget, WidgetSlot } from '../types/Widget'
import useWidgetSlot from '../composables/useWidgetSlot'

interface BuilderState {
  route: string
  slot: string
  params?: Record<string, string>
  widgets: Widget[]
}

export const useBuilderStore = defineStore({
  id: 'builder',
  state: (): BuilderState => ({
    route: '',
    slot: '',
    params: undefined,
    widgets: [],
  }),
  actions: {
    setRoute(route: string): void {
      this.route = route
    },
    setSlot(slot: string): void {
      this.slot = slot
    },
    setParams(params: Record<string, string> | undefined): void {
      this.params = params
    },
    setWidgets(widgets: any): void {
      this.widgets = widgets
    },
    async fetchWidgets(splitTesting: any): Promise<any> {
      const options: WidgetSlot = {
        slot: this.slot,
        params: this.params,
        splitTesting,
      }
      const { data } = await useWidgetSlot(options)
      this.setWidgets(data.relationships.widgets)
      return this.widgets
    },
  },
})
