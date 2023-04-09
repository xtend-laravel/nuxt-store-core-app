import type { Widget } from '~/types/widget'

export interface IWidgetSlot {
  id: number
  params?: any
  splitTesting?: any
}

export default async function useWidgetSlot(options: IWidgetSlot): Promise<any> {
  const { id, params, splitTesting } = options

  // convert json to url query string

  const query = {
    include: 'widgets',
    params: params ?? undefined,
    splitTesting: splitTesting ?? undefined,
  }
  return (await $fetch(`/api/repositories/widget-slots/${id}`, { query })) as Widget[]
}
