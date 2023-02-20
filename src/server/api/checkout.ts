import { H3Event } from 'h3'
import useNitroApi from '~/composables/useNitroApi'
export default defineEventHandler(async (event: H3Event) => {
  return await useNitroApi({
    event,
    endpoint: '/api/restify/carts/getters/checkout',
    requiresAuth: true,
  })
})
