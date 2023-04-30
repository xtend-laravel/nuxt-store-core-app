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
    user: null,
  }),

  getters: {
    currentUser(): UnwrapRef<AuthState['user']> {
      return this.user
    },
    isAuthenticated(): boolean {
      if (process.server) {
        return false
      }
      useAuthStore().getUser()
      return this.loggedIn
    },
  },

  actions: {
    setUser(user: any) {
      this.user = user
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(user))
      }
    },
    getUser(): void {
      if (process.client) {
        this.user = JSON.parse(<any>localStorage.getItem('user'))
        this.loggedIn = !!this.user
      }
    },
    check(state: boolean) {
      this.loggedIn = state
      if (!this.loggedIn) {
        this.logout()
      }
    },
    logout() {
      if (process.client) {
        this.user = null
        this.loggedIn = false
        localStorage.removeItem('user')
      }
    },
  },
})
