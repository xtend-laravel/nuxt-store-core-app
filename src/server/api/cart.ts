import type { H3Event } from 'h3'
import useNitroApi from '../../composables/useNitroApi'

export default defineEventHandler(async (event: H3Event) => {
  // @todo Refactor later
  // return await useApi({
  //   endpoint: `carts/getters/current-cart?sessionId=${event.context.session.id}`,
  //   requiresAuth: false,
  //   action: 'custom',
  //   method: 'GET',
  // })

  let endpoint = `/api/restify/carts/getters/current-cart?sessionId=${event.context.session.id}`
  const query: any = getQuery(event)
  if (query && query.cartId) {
    endpoint = `/api/restify/carts/getters/current-cart?cartId=${query.cartId}`
  }

  return await useNitroApi({
    event,
    action: 'custom',
    endpoint,
  })
})
