<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ProgressBar from './elements/ProgressBar.vue'
import Header from './elements/Header.vue'
import EmptyCart from './elements/EmptyCart.vue'
import Connection from './components/Connection.vue'
import Addresses from './components/Addresses.vue'
import Shipping from './components/Shipping.vue'
import Payment from './components/Payment.vue'
import { useCartStore } from '#nuxt-store-core/store/cart'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'

const props = withDefaults(
  defineProps<{
    leftColumnClasses?: string
    rightColumnClasses?: string
    steps?: any // @todo use type from checkout store
  }>(),
  {
    leftColumnClasses: 'mb-10 w-full px-4 md:w-7/12 lg:mb-0 lg:w-7/12 xl:w-8/12',
    rightColumnClasses: 'w-full px-4 md:w-5/12 lg:w-5/12 xl:w-4/12',
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
checkoutStore.setSteps(props.steps)
checkoutStore.setCurrentStep(0)
</script>

<template>
  <section class="overflow-hidden py-10">
    <div v-if="!isCartEmpty">
      <ProgressBar />
      <Header class="text-center" heading="Express Checkout" />
      <div class="mx-auto grid w-full rounded-2xl bg-white p-2 md:grid-cols-3">
        <template v-for="step in steps" :key="step.index">
          <Component :is="step.component" :current-step-key="step.key" />
        </template>
      </div>
    </div>
    <div v-else>
      <EmptyCart />
    </div>
  </section>
</template>
