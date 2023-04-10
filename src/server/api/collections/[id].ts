import type { H3Event } from 'h3'
import useNitroApi from '../../../composables/useNitroApi'

export default defineEventHandler(async (event: H3Event) => {
  const params: any = event.context.params
  let query: any = getQuery(event)
  query = new URLSearchParams(query).toString()
  return await useNitroApi({
    event,
    endpoint: `/api/restify/collections/${params.id}?${query}`,
  })
})
