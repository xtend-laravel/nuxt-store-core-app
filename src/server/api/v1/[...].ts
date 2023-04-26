import type { H3Event } from 'h3'
import { defineEventHandler, readBody } from 'h3'
import useNitroApi from '../../../composables/useNitroApi'

interface INitroApiOptions {
  event: any
  method: string
  endpoint: string
  body: any
  requiresAuth: boolean
}

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  const body = await readBody(<H3Event>event)
  // const params = getRouterParam(event, '_')
  const { method, endpoint, requiresAuth, data } = body

  return await useNitroApi(
    <INitroApiOptions>{
      event,
      method,
      endpoint,
      requiresAuth,
    },
    data,
  )
})
