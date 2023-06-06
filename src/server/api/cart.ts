import type { H3Event } from 'h3'
import { getCookie } from 'h3'
import useNitroApi from '../../composables/useNitroApi'

export default defineEventHandler(async (event: H3Event) => {
  // @todo Refactor later
  // return await useApi({
  //   endpoint: `carts/getters/current-cart?sessionId=${event.context.session.id}`,
  //   requiresAuth: false,
  //   action: 'custom',
  //   method: 'GET',
  // })

  const cartId: any = getCookie(event, 'cartId') || 0
  let endpoint = `/api/restify/carts/getters/current-cart?sessionId=${event.context.session.id}`

  if (cartId > 0) {
    endpoint = `/api/restify/carts/getters/current-cart?cartId=${cartId}`
  }

  return await useNitroApi({
    event,
    action: 'custom',
    endpoint,
  }).then((response: any) => {
    console.log('setCookie cartId:', response.data.cart.id)
    setCookie(event, 'cartId', response.data.cart.id, {
      domain: process.env.NUXT_APP_SESSION_DOMAIN,
      sameSite: 'lax',
    })
    return response
  })
})
