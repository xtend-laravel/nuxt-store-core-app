import { H3Event, deleteCookie } from 'h3'

export default defineEventHandler((event: H3Event) => {
  deleteCookie(event, 'token')
  return {
    loggedIn: false,
  }
})
