interface IStoreInventory {
  type: string
  routeMatch?: string
  params?: any
  query?: string
}

export default async function useStoreInventory(options: IStoreInventory): Promise<any> {
  const { type, routeMatch, params, query }: IStoreInventory = options
  const routeMatchWithParams: string = routeMatch
    ? routeMatch
        .split('-')
        .map((param) => {
          return param.startsWith('[') && param.endsWith(']') ? params[param.slice(1, -1)] : param
        })
        .join('-')
    : ''
  return $fetch(`/api/${type}/${routeMatchWithParams}${query ? `?${query}` : ''}`)
}
