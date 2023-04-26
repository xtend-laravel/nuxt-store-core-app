import { defineStore } from 'pinia'
import type { UnwrapRef } from 'vue'

interface AddressState {
  _countries: any[]
  _states: any[]
  _addressForm: {
    title: string
    firstName: string
    lastName: string
    company: string
    vatNumber: string
    addressLine1: string
    addressLine2: string
    city: string
    postcode: string
    country: string
    state: string
  }
}

export const useAddressStore = defineStore({
  id: 'address',

  state: (): AddressState => ({
    _countries: [],
    _states: [],
    _addressForm: {
      title: '',
      firstName: '',
      lastName: '',
      company: '',
      vatNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      postcode: '',
      country: '',
      state: '',
    },
  }),

  getters: {
    addressForm(): UnwrapRef<AddressState['_addressForm']> {
      return this._addressForm
    },
    countries(): UnwrapRef<AddressState['_countries']> {
      return this._countries
    },
    states(): UnwrapRef<AddressState['_states']> {
      return this._states
    },
  },

  actions: {
    async fetch(): Promise<void> {},
    async create(formData: any): Promise<void> {
      this._addressForm = formData
    },
    async update(): Promise<void> {},
    async delete(): Promise<void> {},
    async fetchCountries(): Promise<void> {},
    async fetchStates(): Promise<void> {},
  },
})
