import type { Widget } from '~/types/widget'

export interface IWidgetSlot {
  id: number
  params?: any
  splitTesting?: any
}

export default async function useWidgetSlot(options: IWidgetSlot): Promise<any> {
  const { id, params, splitTesting } = options
  const query: any = {
    include: 'widgets',
    params: params ? JSON.stringify(params) : undefined,
    splitTesting: splitTesting ? JSON.stringify(splitTesting) : undefined,
  }
  Object.keys(query).forEach((key) => query[key] === undefined && delete query[key])

  const requestParams = `${id}|${new URLSearchParams(query).toString()}`
  return (await $fetch(`/api/repositories/widget-slots/${requestParams}`)) as Widget
}
