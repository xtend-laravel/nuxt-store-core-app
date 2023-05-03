import type { H3Event } from 'h3'
import useNitroApi from '../../composables/useNitroApi'

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event)
  return await useNitroApi({
    event,
    action: 'GET',
    endpoint: `/api/restify/sale`,
    query,
  })
})
