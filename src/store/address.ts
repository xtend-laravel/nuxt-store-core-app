import { defineStore } from 'pinia'
import type { UnwrapRef } from 'vue'

interface AddressState {
  _countries: any[]
  _states: any[]
  _addressForm: {
    title: string
    first_name: string
    last_name: string
    company_name: string
    contact_email: string
    contact_phone: string
    vat_number: string
    line_one: string
    line_two: string
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
    // @todo map fields via restify - quick workaround to match the API fields
    _addressForm: {
      title: '',
      first_name: '',
      last_name: '',
      company_name: '',
      contact_email: '',
      contact_phone: '',
      vat_number: '',
      line_one: '',
      line_two: '',
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
