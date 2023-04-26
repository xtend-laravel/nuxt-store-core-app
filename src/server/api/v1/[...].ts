import type { H3Event } from 'h3'
import { defineEventHandler, getRouterParam, readBody } from 'h3'
import useNitroApi from '../../../composables/useNitroApi'

interface INitroApiOptions {
  method: string
  endpoint: string
  body: any
  event: any
  requiresAuth: boolean
}

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  const body = await readBody(<H3Event>event)
  const params = getRouterParam(event, '_')
  const { method, endpoint, requiresAuth } = body

  console.info('params', params)

  // Validate the request
  if (requiresAuth && !body.auth) {
    return {
      status: 401,
      body: 'Unauthorized',
    }
  }

  return await useNitroApi(<INitroApiOptions>{
    event,
    method,
    endpoint,
    body,
  })
})
