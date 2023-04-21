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
    <!--    <div id="payment-element"></div> -->
    <!-- paypal, apple pay, google pay as image which is checkabke,  paypal default checked -->
    <div class="flex flex-col items-center items-stretch gap-4 md:flex-row">
      <template v-for="paymentMethod in paymentMethods" :key="paymentMethod.name">
        <label
          class="relative flex-1 cursor-pointer items-center justify-center border border-gray-200 px-6 py-4 transition hover:border-gray-400"
        >
          <input
            v-model="paymentMethod.value"
            type="radio"
            name="payment_method"
            :value="paymentMethod.value"
            class="peer hidden"
          />
          <IconCheck
            class="peer-checked:text-brand-500 absolute right-0 top-0 mr-2 mt-2 hidden h-6 w-6 peer-checked:block"
          />
          <img
            :src="paymentMethod.image"
            alt="paymentMethod.name"
            class="h-[50px] w-full object-contain lg:h-[100px]"
          />
        </label>
      </template>
    </div>
    <button @click="submitPayment">Submit Payment</button>
  </div>
</template>
