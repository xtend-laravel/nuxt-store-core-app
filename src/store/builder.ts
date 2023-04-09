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
      // @todo validate slot exists
      this.slot = slot
    },
    setParams(params: Record<string, string> | undefined): void {
      this.params = params
    },
    setWidgets(widgets: any): void {
      this.widgets = widgets
    },
    mapSlotToId(): number {
      // @todo use slots from API
      const slots: any = {
        page_home: 1,
        page_fashion: 2,
      }
      return slots[this.slot]
    },
    async fetchWidgets(splitTesting: any): Promise<any> {
      // @todo fetch all available slots from API
      const options: WidgetSlot = {
        id: this.mapSlotToId(),
        params: this.params,
        splitTesting,
      }
      const { data } = await useWidgetSlot(options)
      this.setWidgets(data.relationships.widgets)
      return this.widgets
    },
  },
})
