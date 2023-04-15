<script setup lang="ts">
import { StripeCardElement } from '@stripe/stripe-js'
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
    image: '/paypal.png'
  },
  {
    name: 'Apple pay',
    value: 'apple_pay',
    image: '/apple_pay.png'
  },
  {
    name: 'Google pay',
    value: 'google_pay',
    image: '/google_pay.png',
  }
]

onMounted(() => {
  if (clientSecret) {
    initStripe()
  }
})
</script>

<template>
  <div>
<!--    <div id="payment-element"></div>-->
    <!-- paypal, apple pay, google pay as image which is checkabke,  paypal default checked -->
    <div class="flex flex-col md:flex-row items-center gap-4 items-stretch">
      <template v-for="paymentMethod in paymentMethods" :key="paymentMethod.name">
        <label class="relative border border-gray-200 flex-1 items-center justify-center py-4 px-6 cursor-pointer hover:border-gray-400 transition">
          <input type="radio" name="payment_method" :value="paymentMethod.value" v-model="paymentMethod.value" class="hidden peer" />
          <IconCheck class="w-6 h-6 hidden peer-checked:block peer-checked:text-brand-500 top-0 right-0 absolute mt-2 mr-2" />
          <img :src="paymentMethod.image" alt="paymentMethod.name" class="w-full h-[50px] lg:h-[100px] object-contain" />
        </label>
      </template>
    </div>
    <button @click="submitPayment">
      Submit Payment
    </button>
  </div>
</template>
