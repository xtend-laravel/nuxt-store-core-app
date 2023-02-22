import { defineStore } from 'pinia'
import { UnwrapRef } from 'vue'
import { useAuthStore } from '~/store/auth'
import useCheckout from '~/composables/useCheckout'
import type { Addresses, CheckoutState, CheckoutStep, OrderSummary } from '~/types/checkout'

export const useCheckoutStore = defineStore({
  id: 'checkout',

  state: (): CheckoutState => ({
    _steps: [],
    _currentStep: 0,
    _orderSummary: {
      cartId: 0,
      billingAddressId: 0,
      shippingAddressId: 0,
      separateBillingAddress: false,
      currency: 'EUR',
      subtotal: '0.00',
      shipping: '0.00',
      tax: '0.00',
      discount: '0.00',
      total: '0.00',
    },
    _paymentMethods: [],
    _shippingMethods: [],
    _addresses: [],
  }),

  getters: {
    currentStep(): UnwrapRef<CheckoutState['_currentStep']> {
      return this._currentStep
    },
    steps(): UnwrapRef<CheckoutState['_steps']> {
      return this._steps
    },
    orderSummary(): UnwrapRef<OrderSummary<string, string>> {
      return this._orderSummary
    },
    addresses(): UnwrapRef<CheckoutState['_addresses']> {
      return this._addresses
    },
    separateBillingAddress(): UnwrapRef<boolean> {
      return this._orderSummary.separateBillingAddress
    },
    isAuthenticated(): boolean {
      return useAuthStore().isAuthenticated
    },
  },

  actions: {
    async fetch(): Promise<void> {
      const { data } = await useCheckout()
      console.log(data)

      if (data.addresses) {
        this.setAddresses(data.addresses)
      }
    },
    setSteps(steps: CheckoutStep[]): void {
      this._steps = steps
    },
    setCurrentStep(currentStep: number): void {
      this._currentStep = currentStep
    },
    setAddresses(addresses: Addresses[]): void {
      this._addresses = addresses
    },
    setSeparateBillingAddress(separateBillingAddress: boolean): void {
      this._orderSummary.separateBillingAddress = separateBillingAddress
    },
    markStepAsCompleted(stepKey: string): void {
      const step: any = this._steps.find((step: CheckoutStep) => step.key === stepKey)
      if (!step.completed) {
        step.completed = true
      }
    },
    toggleStep(stepKey: string): void {
      const step: any = this._steps.find((step: CheckoutStep) => step.key === stepKey)
      step.hidden = !step.hidden
    },
    toggleBillingAddress(): void {
      this.toggleStep('billing_address')
      this.markStepAsCompleted('shipping_address')
      this.setSeparateBillingAddress(!this._orderSummary.separateBillingAddress)
    },
  },
})
