import { defineStore } from 'pinia'
import { UnwrapRef } from 'vue'
import { useAuthStore } from '~/store/auth'
import useCheckout from '~/composables/useCheckout'

export interface CheckoutStep {
  index: number
  completed: boolean
  title: string
  description: string
  component: any
  hidden?: boolean
}

export interface CheckoutState {
  _steps: CheckoutStep[]
  _currentStep: number
  _summary: Record<string, string>
  _paymentMethod: string
  _shippingMethod: string
  _shippingAddress: Record<string, string>
  _billingAddress: Record<string, string>
}

export const useCheckoutStore = defineStore({
  id: 'checkout',

  state: (): CheckoutState => ({
    _steps: [],
    _currentStep: 0,
    _summary: {},
    _paymentMethod: '',
    _shippingMethod: '',
    _shippingAddress: {},
    _billingAddress: {},
  }),

  getters: {
    currentStep(): UnwrapRef<CheckoutState['_currentStep']> {
      return this._currentStep
    },
    steps(): UnwrapRef<CheckoutState['_steps']> {
      return this._steps
    },
    separateBillingAddress(): UnwrapRef<boolean> {
      return this._billingAddress !== this._shippingAddress
    },
    isAuthenticated(): boolean {
      return useAuthStore().isAuthenticated
    }
  },

  actions: {
    async fetch(): Promise<void> {
      const { data } = await useCheckout()
    },
    setSteps(steps: CheckoutStep[]): void {
      this._steps = steps
    },
    setCurrentStep(currentStep: number): void {
      this._currentStep = currentStep
    },
  },
})
