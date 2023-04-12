<script setup lang="ts">
import { StripeCardElement } from '@stripe/stripe-js'
import { useCartStore } from '#nuxt-store-core/store/cart'

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

onMounted(() => {
  if (clientSecret) {
    initStripe()
  }
})
</script>

<template>
  <div>
    <div id="payment-element"></div>
    <button @click="submitPayment">
      Submit Payment
    </button>
  </div>
</template>
