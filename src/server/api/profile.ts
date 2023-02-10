import { H3Event, getCookie } from 'h3'

const baseUrl = process.env.NUXT_APP_HUB_BASE_URL
export default defineEventHandler(async (event: H3Event) => {
  return await $fetch(`${baseUrl}/api/restify/profile`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCookie(event, 'token') || ''}`,
    },
  })
})
