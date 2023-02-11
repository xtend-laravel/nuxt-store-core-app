import { defineStore } from 'pinia'
import type { UnwrapRef } from 'vue'

interface AuthState {
  loggedIn: boolean
  user: any
}

export const useAuthStore = defineStore({
  id: 'auth',

  // Global state for all auths
  state: (): AuthState => ({
    loggedIn: false,
    user: null,
  }),

  getters: {
    currentUser(): UnwrapRef<AuthState['user']> {
      return this.user
    },
    isAuthenticated(): boolean {
      return this.loggedIn
    },
  },

  actions: {
    setUser(user: any) {
      this.user = user
    },
    check(state: boolean) {
      this.loggedIn = state
    },
    logout() {
      this.user = null
    },
  },
})
