import { H3Event, readBody } from 'h3'
import useNitroApi from '../../../../composables/useNitroApi'
export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  console.log(body, 'defineEventHandler')
  return await useNitroApi(
    {
      event,
      endpoint: `/api/restify/carts/${body.cartId}/actions?action=update-cart-action`,
      requiresAuth: false,
      method: 'POST',
    },
    body,
  )
})
