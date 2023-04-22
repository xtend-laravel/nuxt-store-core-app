<script setup lang="ts">
import { useCartStore } from '#nuxt-store-core/store/cart'

const { totals } = useCartStore()
const { formatPrice } = useFormattedPrice('EUR')

const labels = ref({
  subTotal: 'Subtotal',
  shippingTotal: 'Shipping',
  total: 'Total',
})

function getFormattedPrice(price: Ref<number> | number): string {
  const priceValue = isRef(price) ? price.value : price
  return formatPrice(priceValue, 0, 1000).value
}
</script>

<template>
  <div class="bg-white py-10">
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
