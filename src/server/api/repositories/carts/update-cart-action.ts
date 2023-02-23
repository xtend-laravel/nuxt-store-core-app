import { H3Event } from 'h3'
import useNitroApi from '~/composables/useNitroApi'
export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  console.log(body, useNitroApi)
  return await useNitroApi({
    event,
    endpoint: '/api/restify/carts/actions?action=update-cart-action',
    requiresAuth: true,
    method: 'POST',
  }, body)
})
