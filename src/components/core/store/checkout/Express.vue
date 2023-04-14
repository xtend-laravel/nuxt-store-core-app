<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Panels from "./express/Panels.vue";
import Header from './elements/Header.vue'
import EmptyCart from './elements/EmptyCart.vue'
import Connection from './components/Connection.vue'
import Addresses from './express/Addresses.vue'
import Shipping from './express/Shipping.vue'
import Payment from './components/Payment.vue'
import Summary from './components/Summary.vue'
import { useCartStore } from '#nuxt-store-core/store/cart'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'

const props = withDefaults(
  defineProps<{
    progressBarClasses?: string
    leftColumnClasses?: string
    rightColumnClasses?: string
    steps?: any // @todo use type from checkout store
  }>(),
  {
    progressBarClasses: 'col-span-2',
    leftColumnClasses: 'col-span-9 overflow-hidden px-10',
    rightColumnClasses: 'col-span-3',
    steps: [
      {
        index: 0,
        key: 'connection',
        completed: false,
        title: 'Connection',
        description: 'Enter your billing address',
        component: Connection,
      },
      {
        index: 1,
        key: 'shipping_address',
        completed: false,
        title: 'Shipping address',
        description: 'Enter your billing address',
        component: Addresses,
      },
      {
        index: 2,
        key: 'billing_address',
        completed: false,
        title: 'Billing address',
        description: 'Enter your billing address',
        component: Addresses,
        // @todo hide this step if billing address is the same as shipping address
        hidden: true,
      },
      {
        index: 3,
        key: 'shipping_method',
        completed: false,
        title: 'Shipping method',
        description: 'Select your shipping method',
        component: Shipping,
      },
      {
        index: 4,
        key: 'payment_method',
        completed: false,
        title: 'Payment',
        description: 'Enter your payment information',
        component: Payment,
      },
    ],
  },
)

const checkoutStore = useCheckoutStore()
const { steps, currentStep } = storeToRefs(checkoutStore)

const { isCartEmpty } = useCartStore()
checkoutStore.setType('express')
checkoutStore.setSteps(props.steps)
checkoutStore.setCurrentStep(0)
</script>

<template>
  <section class="relative overflow-hidden p-8">
    <div v-if="!isCartEmpty">
      <slot name="header">
        <Header class="text-center" heading="Checkout faster" />
        <p class="text-center text-lg text-gray-400 font-light">You are almost there...</p>
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
    </div>
    <div v-else>
      <EmptyCart />
    </div>
  </section>
</template>
