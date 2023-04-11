export interface IWidgetSlot {
  id: number
  routeMatch?: string
  query?: string
  params?: any
  splitTesting?: any
}

export default async function useWidgetSlot(options: IWidgetSlot): Promise<any> {
  const { routeMatch, params, query, splitTesting }: IWidgetSlot = options
  const routeMatchWithParams: string = routeMatch
    ? routeMatch
        .split('-')
        .map((param) => {
          return param.startsWith('[') && param.endsWith(']') ? params[param.slice(1, -1)] : param
        })
        .join('-')
    : ''

  // const query: any = {
  //   include: 'widgets',
  //   params: params ? JSON.stringify(params) : undefined,
  //   splitTesting: splitTesting ? JSON.stringify(splitTesting) : undefined,
  // }
  // Object.keys(query).forEach((key) => query[key] === undefined && delete query[key])
  //
  // const requestParams = `${id}|${new URLSearchParams(query).toString()}`
  return $fetch(`/api/repositories/widget-slots/${routeMatchWithParams}${query ? `?${query}` : ''}`)
}
