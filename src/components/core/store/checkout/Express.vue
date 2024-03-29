<script setup lang="ts">
import Panels from './express/Panels.vue'
import Header from './elements/Header.vue'
import EmptyCart from './elements/EmptyCart.vue'
import Summary from './components/Summary.vue'
import Connection from './components/Connection.vue'
import Addresses from './components/Addresses.vue'
import Shipping from './express/Shipping.vue'
import Payment from './components/Payment.vue'
import { useCartStore } from '#nuxt-store-core/store/cart'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'
import useCheckoutComponent from '#nuxt-store-core/composables/useCheckoutComponent'

const props = defineProps<{
  progressBarClasses?: string
  leftColumnClasses?: string
  rightColumnClasses?: string
  steps?: any // @todo use type from checkout store
}>()

const {
  progressBarClasses = 'col-span-2',
  leftColumnClasses = 'col-span-8 overflow-hidden lg:px-10',
  rightColumnClasses = 'col-span-4 flex items-center',
  steps = [
    {
      index: 0,
      key: 'connection',
      completed: false,
      locked: false,
      title: 'Connection',
      description: 'Enter your billing address',
      component: Connection,
    },
    {
      index: 1,
      key: 'shipping_address',
      completed: false,
      locked: true,
      title: 'Shipping address',
      description: 'Enter your shipping address',
      component: Addresses,
    },
    {
      index: 2,
      key: 'billing_address',
      completed: false,
      locked: true,
      title: 'Billing address',
      description: 'Enter your billing address',
      component: Addresses,
      hidden: true,
      // @todo hide this step if billing address is the same as shipping address
    },
    {
      index: 3,
      key: 'shipping_method',
      completed: false,
      locked: true,
      title: 'Shipping method',
      description: 'Select your shipping method',
      component: Shipping,
    },
    {
      index: 4,
      key: 'payment_method',
      completed: false,
      locked: true,
      title: 'Payment',
      description: 'Enter your payment information',
      component: Payment,
    },
  ],
} = props

const initSteps = reactive(steps)

const components = {
  connection: useCheckoutComponent('Connection'),
  shipping_address: useCheckoutComponent('Addresses'),
  billing_address: useCheckoutComponent('Addresses'),
  shipping_method: useCheckoutComponent('Shipping'),
  payment_method: useCheckoutComponent('Payment'),
}

initSteps.forEach((step) => {
  step.component = components[step.key] || null
})

const checkoutStore = useCheckoutStore()
const { isCartEmpty } = useCartStore()
checkoutStore.setType('express')
checkoutStore.setSteps(initSteps)
checkoutStore.setCurrentStep(0)
</script>

<template>
  <section class="relative overflow-hidden p-4 lg:p-8">
    <template v-if="!isCartEmpty">
      <slot name="header">
        <Header class="text-center" />
        <p class="hidden text-center text-lg font-light text-gray-400">You are almost there...</p>
      </slot>
      <div class="grid grid-cols-1 md:grid-cols-12 md:gap-x-4 md:gap-y-10">
        <div :class="leftColumnClasses">
          <slot name="panels">
            <Panels />
          </slot>
        </div>
        <div :class="rightColumnClasses">
          <slot name="summary">
            <Summary />
          </slot>
        </div>
      </div>
    </template>
    <template v-else>
      <div>
        <EmptyCart />
      </div>
    </template>
  </section>
</template>
