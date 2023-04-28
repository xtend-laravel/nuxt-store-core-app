import type { H3Event } from 'h3'
import { defineEventHandler } from 'h3'
import useNitroApi from '../../../composables/useNitroApi'

interface INitroApiOptions {
  event: any
  method: string
  action: string
  endpoint: string
  body?: any
  requiresAuth?: boolean
}

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  const queryParams = getQuery(event)
  const routeParams = getRouterParam(event, '_').split('/')
  const action = routeParams.pop()
  const apiKey = getHeader(event, 'API-Server-Route-Key')
  if (!apiKey && useRuntimeConfig().public.apiKey !== apiKey) {
    return {
      statusCode: 401,
      body: 'Unauthorized',
      key: useRuntimeConfig().apiKey,
    }
  }

  if (!['show', 'index', 'destroy'].includes(action)) {
    const body = await readBody(<H3Event>event)
    const { method, endpoint, requiresAuth, data } = body
    return await useNitroApi(
      <INitroApiOptions>{
        event,
        method,
        action,
        requiresAuth,
        endpoint: `/api/restify/${endpoint}`,
      },
      data,
    )
  }

  const method = action === 'destroy' ? 'DELETE' : 'GET'
  const endpoint = `/api/${routeParams.join('/')}`
  const requiresAuth = queryParams.requiresAuth === 'true'

  return await useNitroApi(<INitroApiOptions>{
    event,
    method,
    action,
    endpoint,
    requiresAuth,
  })
})
