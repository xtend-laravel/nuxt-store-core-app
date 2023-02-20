import { defineStore } from 'pinia'
import type { UnwrapRef } from 'vue'

interface AuthState {
  loggedIn: boolean
  user: any
}

export const useAuthStore = defineStore({
  id: 'auth',

  state: (): AuthState => ({
    loggedIn: false,
    user: JSON.parse(<any>localStorage.getItem('user')),
  }),

  getters: {
    currentUser(): UnwrapRef<AuthState['user']> {
      return this.user
    },
    isAuthenticated(): boolean {
      return this.loggedIn && this.user
    },
  },

  actions: {
    setUser(user: any) {
      this.user = user
      this.loggedIn = true
      localStorage.setItem('user', JSON.stringify(user))
    },
    check(state: boolean) {
      this.loggedIn = state
      if (!this.loggedIn) {
        this.logout()
      }
    },
    logout() {
      this.user = null
      this.loggedIn = false
      localStorage.removeItem('user')
    },
  },
})
