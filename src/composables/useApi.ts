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
      'API-Server-Route-Key': 'api1234567890',
      'Content-Type': 'application/json',
    },
  }
  let response: Promise<any>
  if (!['GET', 'DELETE'].includes(options.method)) {
    opts.body = options ? JSON.stringify(options) : undefined
    response = $fetch(`/api/v1/restify/${options.endpoint}/${options.action}`, opts)
  } else {
    response = $fetch(
      `/api/v1/restify/${options.endpoint}/${options.action}?requiresAuth=${options.requiresAuth}`,
      opts,
    )
  }

  return response.catch((error: any) => {
    const { data }: any = error.data
    if (error.status === 422) {
      throw new Error(data?.message)
    } else {
      throw new Error('An error occurred during the API call.')
    }
  })
}
