interface IApiOptions {
  endpoint: string
  action: string
  requiresAuth?: boolean
  method?: any
  data?: any
}

export default function useApi(options: IApiOptions): Promise<any> {
  const opts: any = {
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
    },
  }
  if (!['GET', 'DELETE'].includes(options.method)) {
    opts.body = options ? JSON.stringify(options) : undefined
    return $fetch(`api/v1/restify/${options.endpoint}/${options.action}`, opts)
  }

  return $fetch(`api/v1/restify/${options.endpoint}/${options.action}?requiresAuth=${options.requiresAuth}`, opts)
}
