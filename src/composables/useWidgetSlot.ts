import { Widget } from '../types/Widget'

export interface IWidgetSlot {
  slot: string
  params?: any
  splitTesting?: 'A' | 'B'
}

export default async function useWidgetSlot(options: IWidgetSlot): Promise<Widget[]> {
  const { slot, params, splitTesting } = options

  const query = {
    params: params ?? undefined,
    splitTesting: splitTesting ?? undefined,
  }
  return await $fetch(`/api/repositories/widget-slots/${slot}`, { query }) as Widget[]
}
