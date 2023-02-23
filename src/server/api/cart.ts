import { H3Event } from 'h3'
import useNitroApi from '~/composables/useNitroApi'
export default defineEventHandler(async (event: H3Event) => {
  const session = event.context.session
  return {
    session,
  }
})
