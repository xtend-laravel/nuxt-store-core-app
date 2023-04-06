<script setup lang="ts">
import { useCartStore } from '#nuxt-store-core/store/cart'

const { items } = useCartStore()
const { formatPrice } = useFormattedPrice('EUR')

function getFormattedPrice(price: Ref<number> | number): string {
  const priceValue = isRef(price) ? price.value : price
  return formatPrice(priceValue, 0, 1000).value
}
</script>

<template>
  <div>
    <div class="px-4 py-6 sm:px-8 sm:py-10">
      <div class="flow-root">
        <ul class="-my-8">
          <li
            v-for="item in items"
            :key="item.id"
            class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
          >
            <slot :key="item.id" name="override-items-line" :item="item">
              <StoreCartItemsLineItem :key="item.id" :item="item" />
            </slot>
          </li>
        </ul>
      </div>

      <div>
        <slot name="override-items-summary">
          <StoreCartItemsSummary />
        </slot>
      </div>
      <slot name="override-footer-actions">
        <StoreCartItemsFooterActions />
      </slot>
    </div>
  </div>
</template>
