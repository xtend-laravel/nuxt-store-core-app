<script setup lang="ts">
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '#nuxt-store-core/store/cart'

const { totals } = storeToRefs(useCartStore())
// @todo need to set the currency based on the store perhaps env for now later currency via API and ability to switch
const { formatPrice } = useFormattedPrice()

const labels = ref({
  subTotal: 'Subtotal',
  shippingTotal: 'Shipping',
  total: 'Total',
})

// @todo make 100 the default value and use `formatPrice` directly instead?
function getFormattedPrice(price: Ref<number> | number): string {
  return formatPrice(unref(price), 0, 100).value
}
</script>

<template>
  <div class="bg-white pb-4 pt-10">
    <div class="font-heading mb-3 flex items-center justify-between bg-gray-50 px-4 py-2 font-medium leading-8">
      <span v-text="labels.subTotal" />
      <span class="text-lg font-semibold text-gray-900" v-text="getFormattedPrice(totals.sub_total)" />
    </div>
    <div class="font-heading mb-3 flex items-center justify-between bg-gray-50 px-4 py-2 font-medium leading-8">
      <span v-text="labels.shippingTotal" />
      <span class="text-lg font-semibold text-gray-900" v-text="getFormattedPrice(totals.shipping_total)" />
    </div>
    <div class="font-heading mb-3 flex items-center justify-between bg-gray-50 px-4 py-2 font-medium leading-8">
      <span class="font-medium text-gray-900" v-text="labels.total" />
      <span class="text-brand-600 flex items-center text-lg" v-text="getFormattedPrice(totals.total)" />
    </div>
  </div>
</template>
