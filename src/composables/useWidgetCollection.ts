import { Widget } from '../types/Widget'

export interface IWidgetCollection {
  type: string
  route: string
  params?: any
  splitTesting?: 'A' | 'B'
}

export default async function useWidgetCollection(options: IWidgetCollection): Promise<Widget[]> {
  const { type, route, params, splitTesting } = options

  // Build query
  const query = {
    params: params ?? undefined,
    splitTesting: splitTesting ?? undefined,
  }

  // get widgets from api
  return await $fetch(`/api/repositories/widgets/${type}/${route}`, { query }) as Widget[]
}
