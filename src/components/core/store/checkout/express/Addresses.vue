<script setup lang="ts">
import Addresses from '../components/Addresses.vue'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'
import IconCheck from '~icons/carbon/checkmark-filled'
import IconLocation from '~icons/carbon/location-filled'

const checkoutStore = useCheckoutStore()
const shippingCompleted = computed(() => checkoutStore.isStepCompleted('shipping_address'))
const billingCompleted = computed(() => checkoutStore.isStepCompleted('billing_address'))
const addressType = 'Shipping'
</script>

<template>
  <div>
    <div class="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
      <div class="flex items-center gap-6 font-medium">
        <button
          type="button"
          class="text-brand-500 flex items-center gap-1 text-gray-300"
          :class="{ '!text-brand-500': shippingCompleted }"
        >
          <IconCheck class="h-4 w-4" />
          <span>Shipping address</span>
        </button>
        <button
          type="button"
          class="text-brand-500 flex items-center gap-1 text-gray-300"
          :class="{ '!text-brand-500': billingCompleted }"
        >
          <IconCheck class="h-4 w-4" />
          <span>Billing address</span>
        </button>
      </div>
      <div class="flex gap-2">
        <button
          v-if="shippingCompleted"
          type="button"
          class="focus:shadow-outline-brand focus:border-brand-700 active:bg-brand-700 hover:bg-brand-600 bg-brand-500 flex items-center justify-center rounded border border-transparent px-4 text-xs font-medium leading-6 text-white transition duration-150 ease-in-out focus:outline-none"
        >
          Confirm {{ addressType }} Address
        </button>
        <button
          type="button"
          class="focus:shadow-outline-brand focus:border-brand-700 active:bg-brand-700 flex items-center justify-center rounded border border-transparent bg-black/70 px-4 text-xs font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-black focus:outline-none"
        >
          <IconLocation class="mr-1 h-4 w-4" /> Add Address
        </button>
      </div>
    </div>
    <Addresses current-step-key="shipping_address" type="express" />
  </div>
</template>
