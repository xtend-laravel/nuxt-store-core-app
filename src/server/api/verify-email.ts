import type { H3Event } from 'h3'

const baseUrl = process.env.NUXT_APP_HUB_BASE_URL
let emailVerified = false

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  await $fetch(`${baseUrl}/api/verify-email/${body.email}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response: any) => {
    emailVerified = true
  })
  return {
    emailVerified,
  }
})
