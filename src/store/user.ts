import { defineStore } from 'pinia'
import type { UnwrapRef } from 'vue'

interface UserState {
  _action: 'update' | 'create' | null
  _userForm: {
    id?: number
    language_id?: number
    email: string
    title: string
    first_name: string
    last_name: string
    company_name?: string
    password: string
    meta: {
      birth_date: string
      newsletter: boolean
      terms: boolean
    }
  }
}

export const useUserStore = defineStore({
  id: 'user',

  state: (): UserState => ({
    _action: null,
    _userForm: {
      id: undefined,
      language_id: undefined,
      email: '',
      title: '',
      first_name: '',
      last_name: '',
      company_name: '',
      password: '',
      meta: {
        birth_date: '',
        newsletter: false,
        terms: false,
      },
    },
  }),

  getters: {
    action(): UserState['_action'] {
      return this._action
    },
    userForm(): UnwrapRef<UserState['_userForm']> {
      return this._userForm
    },
    getMeta(): UserState['_userForm']['meta'] {
      return this._userForm.meta
    },
  },

  actions: {
    setUserForm(userForm: any): void {
      this._userForm = userForm
    },
    setAction(action: UserState['_action']): void {
      this._action = action
    },
    async create(formData: any): Promise<void> {
      this._userForm = formData
    },
    async update(): Promise<void> {},
  },
})
