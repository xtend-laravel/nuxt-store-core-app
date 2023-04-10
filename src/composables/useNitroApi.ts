import type { H3Event } from 'h3'
import { getCookie } from 'h3'

const baseUrl = process.env.NUXT_APP_HUB_BASE_URL
interface INitroApiOptions {
  event: H3Event
  endpoint: string
  requiresAuth?: boolean
  method?: string
  contentType?: string
  query?: any
}

export default function useNitroApi(options: INitroApiOptions, data?: any): Promise<any> {
  const { event, endpoint, requiresAuth = false, method = 'GET', contentType = 'application/json', query } = options
  const headers: any = {
    Accept: contentType,
    'Language-Locale': getCookie(event, 'i18n_redirected'),
    'Content-Type': contentType,
  }
  if (requiresAuth) {
    headers.Authorization = `Bearer ${getCookie(event, 'token') || ''}`
  }

  return $fetch(`${baseUrl}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    query,
  })
}
