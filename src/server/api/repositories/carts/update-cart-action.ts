import type { H3Event } from 'h3'
import { readBody } from 'h3'
import useNitroApi from '../../../../composables/useNitroApi'

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)

  return await useNitroApi(
    {
      event,
      action: 'update-cart-action',
      endpoint: `/api/restify/carts/${body.cartId}/public-actions?action=update-cart-action`,
      requiresAuth: false,
      method: 'POST',
    },
    body,
  )
})
