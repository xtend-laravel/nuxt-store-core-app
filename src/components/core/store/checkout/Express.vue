<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ProgressBar from './elements/ProgressBar.vue'
import Header from './elements/Header.vue'
import EmptyCart from './elements/EmptyCart.vue'
import Connection from './components/Connection.vue'
import Addresses from './components/Addresses.vue'
import Shipping from './components/Shipping.vue'
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
    leftColumnClasses: 'col-span-7 overflow-hidden px-10',
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
        hidden: false,
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
        <Header class="text-center" heading="Express Checkout" />
      </slot>
      <div class="grid grid-cols-1 md:grid-cols-12 md:gap-x-4 md:gap-y-10">
        <slot name="progress-bar" :progress-bar-classes="progressBarClasses">
          <ProgressBar direction="vertical" :class="progressBarClasses" />
        </slot>
        <div :class="leftColumnClasses">
          <slot name="components" v-bind="{ steps, currentStep }">
            <template v-for="step in steps" :key="step.index">
              <Component :is="step.component" :current-step-key="step.key" type="express" />
            </template>
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
