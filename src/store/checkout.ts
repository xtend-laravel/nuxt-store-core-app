import { defineStore } from 'pinia'
import type { UnwrapRef } from 'vue'
import useCheckout from '../composables/useCheckout'
import { useAuthStore } from './auth'
import { useCartStore } from './cart'
import type { Addresses, CheckoutState, CheckoutStep, OrderSummary } from '~/types/checkout'
import useApi from '~/composables/useApi'

export const useCheckoutStore = defineStore({
  id: 'checkout',

  state: (): CheckoutState => ({
    _type: 'standard',
    _steps: [],
    _currentStep: 0,
    _orderSummary: {
      cartId: 0,
      billingAddressId: 0,
      shippingAddressId: 0,
      shippingMethodIdentifier: '',
      separateBillingAddress: false,
      paymentGatewayIdentifier: '',
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
    checkoutType(): UnwrapRef<CheckoutState['_type']> {
      return this._type
    },
    currentStep(): UnwrapRef<CheckoutState['_currentStep']> {
      return this._currentStep
    },
    nextStep(): UnwrapRef<number> {
      return this._steps.findIndex((step) => step.completed === false)
    },
    steps(): UnwrapRef<CheckoutState['_steps']> {
      return this._steps
    },
    stepsValidated(): boolean {
      return this._steps.every((step) => step.completed)
    },
    orderSummary(): UnwrapRef<OrderSummary<string, string>> {
      return this._orderSummary
    },
    addresses(): UnwrapRef<CheckoutState['_addresses']> {
      return this._addresses
    },
    shippingMethods(): UnwrapRef<CheckoutState['_shippingMethods']> {
      return this._shippingMethods
    },
    selectedShippingMethod(): UnwrapRef<string | undefined> {
      return this._orderSummary.shippingMethodIdentifier
    },
    selectedPaymentMethod(): UnwrapRef<string | undefined> {
      return this._orderSummary.paymentGatewayIdentifier
    },
    selectedBillingAddressId(): UnwrapRef<number | undefined> {
      return this._orderSummary.billingAddressId
    },
    selectedShippingAddressId(): UnwrapRef<number | undefined> {
      return this._orderSummary.shippingAddressId
    },
    separateBillingAddress(): UnwrapRef<boolean> {
      return this._orderSummary.separateBillingAddress
    },
    isAuthenticated(): boolean {
      return useAuthStore().isAuthenticated
    },
  },

  actions: {
    init(): void {
      this.setOrderSummary({
        ...this._orderSummary,
        cartId: useCartStore().cartId,
        subtotal: useCartStore().totals.sub_total,
        shipping: useCartStore().totals.shipping_total,
        tax: useCartStore().totals.tax_total,
        discount: useCartStore().totals.discount_total,
        total: useCartStore().totals.total,
      })
    },
    async fetch(): Promise<void> {
      this.init()
      if (!this.isAuthenticated) {
        return
      }
      console.log('fetching checkout data')

      const { data } = await useCheckout()
      if (data.addresses) {
        this.setAddresses(data.addresses)
      }

      if (data.shipping_methods) {
        this.setShippingMethods(data.shipping_methods)
      }

      if (data.selectedAddressIds?.billing) {
        this.setBillingAddressId(data.selectedAddressIds.billing)
      }

      if (data.selectedAddressIds?.shipping) {
        this.setShippingAddressId(data.selectedAddressIds.shipping)
      }

      if (data.selectedShippingIdentifier) {
        this.setSelectedShippingMethod(data.selectedShippingIdentifier)
      }
    },
    setType(type: string): void {
      this._type = type
    },
    setOrderSummary(orderSummary: OrderSummary<any, any>): void {
      this._orderSummary = orderSummary
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
    setShippingMethods(shippingMethods: any[]): void {
      this._shippingMethods = shippingMethods
    },
    setSelectedShippingMethod(shippingMethodIdentifier: string): void {
      this._orderSummary.shippingMethodIdentifier = shippingMethodIdentifier
    },
    setBillingAddressId(billingAddressId: number): void {
      this._orderSummary.billingAddressId = billingAddressId
    },
    setShippingAddressId(shippingAddressId: number): void {
      this._orderSummary.shippingAddressId = shippingAddressId
    },
    setSeparateBillingAddress(separateBillingAddress: boolean): void {
      this._orderSummary.separateBillingAddress = separateBillingAddress
    },
    setSelectedPaymentMethod(paymentGatewayIdentifier: string): void {
      this._orderSummary.paymentGatewayIdentifier = paymentGatewayIdentifier
      // init payment gateway for plugin
    },
    markStepAsIncomplete(stepKey: any): void {
      const step: any = this._steps.find((step: CheckoutStep) => step.key === stepKey)
      step.completed = false
    },
    markStepAsCompleted(stepKey: any): void {
      const step: any = this._steps.find((step: CheckoutStep) => step.key === stepKey)
      if (!step.completed) {
        step.completed = true
        step.locked = false
        this.handleNextStep(step)
      }
    },
    handleNextStep(step: any): void {
      const nextStep: any = this._steps[this._steps.indexOf(step) + 1]
      if (nextStep) {
        if (nextStep.hidden) {
          this.markStepAsCompleted(nextStep.key)
        }
        nextStep.locked = false
      }
    },
    isStepCompleted(stepKey: string): boolean {
      const step: any = this._steps.find((step: CheckoutStep) => step.key === stepKey)
      return step.completed
    },
    toggleStep(stepKey: string): void {
      const step: any = this._steps.find((step: CheckoutStep) => step.key === stepKey)
      step.hidden = !step.hidden
    },
    toggleBillingAddress(): void {
      this.markStepAsIncomplete('billing_address')
      this.toggleStep('billing_address')
      this.markStepAsCompleted('shipping_address')
      const step: any = this._steps.find((step: CheckoutStep) => step.key === 'billing_address')
      step.completed = false
      this.setSeparateBillingAddress(!this._orderSummary.separateBillingAddress)
    },
    async createOrder(): Promise<any> {
      // @todo Improve remove endpoint add entity then if action allow public: or private: actions
      return await useApi({
        endpoint: `carts/${this._orderSummary.cartId}/actions?action=create-order-action`,
        requiresAuth: true,
        action: 'create',
        method: 'POST',
        data: {
          ...useCartStore().meta,
        },
      })
    },
    async confirmPayment(): Promise<any> {
      // @todo Improve remove endpoint add entity then if action allow public: or private: actions
      return await useApi({
        endpoint: `carts/${this._orderSummary.cartId}/actions?action=authorize-payment-checkout-action`,
        requiresAuth: true,
        action: 'custom',
        method: 'POST',
        data: {
          ...useCartStore().meta,
        },
      })
    },
  },
})
