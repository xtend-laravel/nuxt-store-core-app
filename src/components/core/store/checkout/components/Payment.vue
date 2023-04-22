<script setup lang="ts">
import type { StripeCardElement } from '@stripe/stripe-js'
import { useCartStore } from '#nuxt-store-core/store/cart'
import IconCheck from '~icons/carbon/checkmark-filled'

const cartStore = useCartStore()
const { $stripe } = useNuxtApp()
const clientSecret = cartStore.meta?.stripe_client_secret || ''
let cardElement: StripeCardElement

async function initStripe() {
  const stripe: any = await $stripe
  const elements: any = stripe.elements({
    clientSecret,
  })
  const paymentElement = elements.create('payment', {
    layout: 'tabs',
  })
  paymentElement.mount('#payment-element')
}

async function submitPayment() {
  const stripe = await $stripe
  const paymentElement = elements.create('payment')
  const { error, paymentIntent } = await stripe.confirmCardPayment('{{ client_secret }}', {
    payment_method: {
      card: cardElement,
      billing_details: {
        name: 'Jenny Rosen',
      },
    },
  })
}

const paymentMethods = [
  {
    name: 'Paypal',
    value: 'paypal',
    image: '/paypal.png',
  },
  {
    name: 'Apple pay',
    value: 'apple_pay',
    image: '/apple_pay.png',
  },
  {
    name: 'Google pay',
    value: 'google_pay',
    image: '/google_pay.png',
  },
]

onMounted(() => {
  if (clientSecret) {
    initStripe()
  }
})
</script>

<template>
  <div>
    <div class="group flex flex-col items-center items-stretch gap-4 md:flex-row">
      <template v-for="paymentMethod in paymentMethods" :key="paymentMethod.name">
        <label
          class="relative flex-1 cursor-pointer items-center justify-center border border-gray-200 px-6 py-8 transition hover:border-gray-400"
        >
          <input
            v-model="paymentMethod.value"
            type="radio"
            name="payment_method"
            :value="paymentMethod.value"
            class="peer hidden"
          />
          <IconCheck
            class="peer-checked:text-brand-500 pointer-events-none absolute right-4 top-8 box-content block h-6 w-6 -translate-y-1/2 rounded-full border-4 border-gray-300 bg-white text-white group-hover:border-gray-400 peer-checked:border-gray-200"
          />
          <img :src="paymentMethod.image" alt="paymentMethod.name" class="h-[50px] w-full object-contain" />
        </label>
      </template>
    </div>
    <div class="mt-10 flex flex-col-reverse gap-4 md:flex-row md:justify-end">
      <div id="payment-element"></div>
      <button
        type="button"
        class="focus:shadow-outline-brand focus:border-brand-700 active:bg-brand-700 hover:bg-brand-600 bg-brand-500 flex items-center justify-center rounded border border-transparent px-6 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out focus:outline-none"
        @click="submitPayment"
      >
        Place Order
      </button>
    </div>
  </div>
</template>
