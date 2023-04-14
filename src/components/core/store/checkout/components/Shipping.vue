<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'
import IconCheck from '~icons/carbon/checkmark-filled'
import ShippingIcon from '~icons/carbon/delivery-truck'

const checkoutStore = useCheckoutStore()
const { shippingMethods, checkoutType } = storeToRefs(checkoutStore)
const form: any = reactive({
  shippingAddressId: 0,
})

console.log('shipping methods', shippingMethods.value)
</script>

<template>
  <div :class="{ 'grid grid-cols-3 space-x-6': checkoutType === 'standard' }">
    <div v-for="shippingMethod in shippingMethods" :key="shippingMethod.identifier">
      <section class="shadow-3xl border-base group my-4 rounded bg-gray-50 hover:bg-white">
        <div class="relative p-4 text-sm not-italic">
          <div class="flex w-11/12 flex-row items-center">
            <ShippingIcon class="mr-4 h-10 w-10" />
            <div class="flex-1">
              <h4 class="mb-0 font-medium">{{ shippingMethod.name }} ({{ shippingMethod.identifier }})</h4>
              <div v-text="shippingMethod.description" />
            </div>
            <div class="flex-1 text-right">
              <span class="font-medium">&euro;{{ shippingMethod.price.value }}</span>
            </div>
          </div>
          <input
            :id="`shippingMethod_${shippingMethod.identifier}`"
            v-model="form.shippingAddressId"
            :value="shippingMethod.identifier"
            class="peer hidden"
            type="radio"
          />
          <label :for="`shippingMethod_${shippingMethod.identifier}`" class="absolute inset-0" />
          <IconCheck
            class="pointer-events-none absolute right-4 top-8 box-content block h-6 w-6 -translate-y-1/2 rounded-full border-4 border-gray-300 bg-white text-white group-hover:border-gray-400 peer-checked:border-gray-300 peer-checked:text-black"
          />
        </div>
      </section>
    </div>
  </div>
</template>
