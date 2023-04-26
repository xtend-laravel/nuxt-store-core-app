import type { H3Event } from 'h3'
import { setCookie } from 'h3'

const baseUrl = process.env.NUXT_APP_HUB_BASE_URL
let token: string | null = null
let user: any = null
const cookieOptions = {
  httpOnly: true,
  maxAge: 60 * 60 * 24, // 1 day
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  await $fetch(`${baseUrl}/api/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response: any) => {
    user = response.data.user
    token = decodeURIComponent(response.data.token.plainTextToken)
    setCookie(event, 'token', token, cookieOptions)
  })
  return {
    loggedIn: !!token,
    token,
    user,
  }
})
