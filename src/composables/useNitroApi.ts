import type { H3Event } from 'h3'
import { getCookie } from 'h3'

const baseUrl = process.env.NUXT_APP_HUB_BASE_URL
interface INitroApiOptions {
  event: H3Event
  endpoint: string
  action: string
  requiresAuth?: boolean
  method?: any
  contentType?: string
  query?: any
}

export default function useNitroApi(options: INitroApiOptions, data?: any): Promise<any> {
  const {
    event,
    endpoint,
    action,
    requiresAuth = false,
    method = 'GET',
    contentType = 'application/json',
    query = {},
  } = options
  const headers: any = {
    Accept: contentType,
    'Language-Locale': getCookie(event, 'i18n_redirected'),
    'Content-Type': contentType,
  }
  if (requiresAuth) {
    headers.Authorization = `Bearer ${getCookie(event, 'token') || ''}`
  }

  const opts: any = {
    method,
    headers,
  }

  if (!['show', 'index', 'destroy'].includes(action)) {
    opts.body = data ? JSON.stringify(data) : undefined
    opts.query = query
  }

  // eslint-disable-next-line no-console
  console.log('useNitroApi', `${baseUrl}${endpoint}`)
  // eslint-disable-next-line no-console
  console.log('headers', headers)
  // eslint-disable-next-line no-console
  console.log('options', opts)

  return $fetch(`${baseUrl}${endpoint}`, opts)
}
