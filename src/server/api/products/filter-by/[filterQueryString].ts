import type { H3Event } from 'h3'
import useNitroApi from '../../../../composables/useNitroApi'

export default defineEventHandler(async (event: H3Event) => {
  const params: any = event.context.params
  return await useNitroApi({
    event,
    endpoint: `/api/restify/products?page=1${params.filterQueryString}`,
  })
})
