import { Widget } from '../types/Widget'

export interface IWidgetSlot {
  slot: string
  params?: any
  splitTesting?: any
}

export default async function useWidgetSlot(options: IWidgetSlot): Promise<any> {
  const { slot, params, splitTesting } = options

  // convert json to url query string

  const query = {
    include: 'widgets',
    params: params ?? undefined,
    splitTesting: splitTesting ?? undefined,
  }
  return await $fetch(`/api/repositories/widget-slots/${slot}`, { query }) as Widget[]
}
