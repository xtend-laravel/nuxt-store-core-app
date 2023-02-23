import { H3Event, getCookie } from 'h3'
const baseUrl = process.env.NUXT_APP_HUB_BASE_URL
interface INitroApiOptions {
  event: H3Event
  endpoint: string
  requiresAuth?: boolean
  method?: string
  contentType?: string
}

export default function useNitroApi(options: INitroApiOptions, data?: any): Promise<any> {
  const { event, endpoint, requiresAuth = false, method = 'GET', contentType = 'application/json' } = options
  const headers: any = {
    'Accept': contentType,
    'Content-Type': contentType,
  }
  if (requiresAuth)
    headers.Authorization = `Bearer ${getCookie(event, 'token') || ''}`

  return $fetch(`${baseUrl}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  })
}
