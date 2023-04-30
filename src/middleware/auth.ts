import { storeToRefs } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '#nuxt-store-core/store/auth'

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const { isAuthenticated } = storeToRefs(useAuthStore())

  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})
