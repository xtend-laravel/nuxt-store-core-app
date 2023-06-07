import type { H3Event } from 'h3'
import useNitroApi from '../../composables/useNitroApi'

export default defineEventHandler(async (event: H3Event) => {
  // cartId param is not used here, but it is used in the client side
  const cartId: any = getCookie(event, 'cartId') || 0
  return await useNitroApi({
    event,
    action: 'GET',
    endpoint: `/api/restify/orders/getters/checkout?cartId=${cartId}`,
    requiresAuth: true,
  })
})
