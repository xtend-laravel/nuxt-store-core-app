import type { H3Event } from 'h3'
import { readBody } from 'h3'
import useNitroApi from '../../../composables/useNitroApi'

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  return await useNitroApi(
    {
      event,
      endpoint: `/api/restify/addresses`,
      requiresAuth: true,
      method: 'POST',
    },
    body,
  )
})
