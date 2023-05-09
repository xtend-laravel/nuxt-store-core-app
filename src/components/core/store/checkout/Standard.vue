<script setup lang="ts">
import Summary from './components/Summary.vue'
import ProgressBar from './elements/ProgressBar.vue'
import Header from './elements/Header.vue'
import Panels from './standard/Panels.vue'
import EmptyCart from './elements/EmptyCart.vue'
import { useCartStore } from '#nuxt-store-core/store/cart'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'
import useCheckoutComponent from '#nuxt-store-core/composables/useCheckoutComponent'

const props = withDefaults(
  defineProps<{
    progressBarClasses?: string
    leftColumnClasses?: string
    rightColumnClasses?: string
    steps?: any // @todo use type from checkout store
  }>(),
  {
    progressBarClasses: 'mb-20 flex justify-center space-x-4 bg-slate-50 py-4 shadow-sm',
    leftColumnClasses: 'mb-10 w-full px-4 md:w-7/12 lg:mb-0 lg:w-7/12 xl:w-8/12',
    rightColumnClasses: 'w-full px-4 md:w-5/12 lg:w-5/12 xl:w-4/12',
    steps: [
      {
        index: 0,
        key: 'connection',
        completed: false,
        title: 'Connection',
        description: 'Enter your billing address',
      },
      {
        index: 1,
        key: 'shipping_address',
        completed: false,
        title: 'Shipping address',
        description: 'Enter your billing address',
      },
      {
        index: 2,
        key: 'billing_address',
        completed: false,
        title: 'Billing address',
        description: 'Enter your billing address',
        // @todo hide this step if billing address is the same as shipping address
        hidden: false,
      },
      {
        index: 3,
        key: 'shipping_method',
        completed: false,
        title: 'Shipping method',
        description: 'Select your shipping method',
      },
      {
        index: 4,
        key: 'payment_method',
        completed: false,
        title: 'Payment',
        description: 'Enter your payment information',
      },
    ],
  },
)

const steps = reactive(props.steps)

const components = {
  connection: useCheckoutComponent('Connection'),
  shipping_address: useCheckoutComponent('Addresses'),
  billing_address: useCheckoutComponent('Addresses'),
  shipping_method: useCheckoutComponent('Shipping'),
  payment_method: useCheckoutComponent('Payment'),
}

steps.forEach((step) => {
  step.component = components[step.key] || null
})

const { isCartEmpty } = useCartStore()
const checkoutStore = useCheckoutStore()
checkoutStore.setType('standard')
checkoutStore.setSteps(steps)
checkoutStore.setCurrentStep(0)
</script>

<template>
  <section class="overflow-hidden py-10">
    <div v-if="!isCartEmpty">
      <slot name="progress-bar" :progress-bar-classes="progressBarClasses">
        <ProgressBar :class="progressBarClasses" />
      </slot>
      <slot name="header">
        <Header heading="Checkout" />
      </slot>
      <div class="flex flex-wrap">
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
      <slot name="empty-cart">
        <EmptyCart />
      </slot>
    </div>
  </section>
</template>
