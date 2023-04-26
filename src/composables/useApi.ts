interface IApiOptions {
  endpoint: string
  action: string
  requiresAuth?: boolean
  method?: any
  data?: any
}

export default function useApi(options: IApiOptions): Promise<any> {
  return $fetch(`api/v1/${options.endpoint}/${options.action}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: options ? JSON.stringify(options) : undefined,
  })
}
