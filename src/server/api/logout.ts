import type { H3Event } from 'h3'
import { deleteCookie } from 'h3'

export default defineEventHandler((event: H3Event) => {
  deleteCookie(event, 'token')
  return {
    loggedIn: false,
  }
})
