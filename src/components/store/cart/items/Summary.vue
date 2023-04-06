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
  <div class="mt-6 space-y-3 border-b border-t py-8">
    <div class="flex items-center justify-between">
      <p class="text-gray-400" v-text="labels.subTotal" />
      <p class="text-lg font-semibold text-gray-900" v-text="getFormattedPrice(totals.sub_total)" />
    </div>
    <div class="flex items-center justify-between">
      <p class="text-gray-400" v-text="labels.shippingTotal" />
      <p class="text-lg font-semibold text-gray-900" v-text="getFormattedPrice(totals.shipping_total)" />
    </div>
  </div>
  <div class="mt-6 flex items-center justify-between">
    <p class="text-sm font-medium text-gray-900" v-text="labels.total" />
    <p class="text-2xl font-semibold text-gray-900" v-text="getFormattedPrice(totals.total)" />
  </div>
</template>
