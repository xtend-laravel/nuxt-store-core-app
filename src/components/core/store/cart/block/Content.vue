<script setup lang="ts">
import { useCartStore } from '#nuxt-store-core/store/cart'

const cartStore = useCartStore()
const { formatPrice } = useFormattedPrice()

function getFormattedPrice(price: Ref<number> | number): string {
  const priceValue = isRef(price) ? price.value : price
  return formatPrice(priceValue, 0, 100).value
}
</script>

<template>
  <section class="py-12 sm:py-16 lg:py-6">
    <slot v-if="cartStore.isCartEmpty" name="empty">
      <div class="flex h-full flex-col items-center justify-center">
        <p class="mt-4 text-sm text-gray-500">Your cart is empty slot.</p>
      </div>
    </slot>
    <div v-else class="mx-auto px-4 sm:px-6 lg:px-8">
      <slot name="override-header">
        <div class="flex items-center justify-center">
          <h1 class="text-xl font-semibold text-gray-900">Items in your cart</h1>
        </div>
      </slot>
      <slot name="override-items">
        <CoreStoreCartItems />
      </slot>
    </div>
  </section>
</template>
