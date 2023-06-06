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
  const params: any = event.context.params
  if (params && params.id > 0) {
    endpoint = `/api/restify/carts/getters/current-cart?cartId=${params.id}`
  }

  return await useNitroApi({
    event,
    action: 'custom',
    endpoint,
  })
})
