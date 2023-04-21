import type { H3Event } from 'h3'
import { getCookie } from 'h3'

export default defineEventHandler((event: H3Event) => {
  const token = getCookie(event, 'token')
  // @todo Might need to check if token is valid and not expired but ok for now for basic auth
  return {
    loggedIn: !!token,
  }
})
