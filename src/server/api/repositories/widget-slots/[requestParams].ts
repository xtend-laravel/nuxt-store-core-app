import type { H3Event } from 'h3'
import useNitroApi from '../../../../composables/useNitroApi'

export default defineEventHandler(async (event: H3Event) => {
  const params: any = event.context.params
  const requestParams = params.requestParams.replace('%7C', '?')
  console.info(`/api/restify/widget-slots/${requestParams}&include=widgets`)
  return await useNitroApi({
    event,
    endpoint: `/api/restify/widget-slots/${requestParams}&include=widgets`,
  })
})
