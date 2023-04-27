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

  if (!['show', 'index'].includes(action)) {
    const body = await readBody(<H3Event>event)
    const { method, endpoint, requiresAuth, data } = body
    return await useNitroApi(
      <INitroApiOptions>{
        event,
        method,
        action,
        endpoint,
        requiresAuth,
      },
      data,
    )
  }

  const method = queryParams.method || 'GET'
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
