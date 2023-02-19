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
      return this.loggedIn
    },
  },

  actions: {
    setUser(user: any) {
      this.user = user
      console.log('User to save:', JSON.stringify(user))
      localStorage.setItem('user', JSON.stringify(user))
    },
    check(state: boolean) {
      this.loggedIn = state
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
  },
})
