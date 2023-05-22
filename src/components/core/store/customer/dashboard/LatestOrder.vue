<script setup lang="ts">
import { fromNow } from '#nuxt-store-core/utils/fromNow'
import type { LatestOrder } from '#nuxt-store-core/store/customer/dashboard'

const props = withDefaults(
  defineProps<{
    latestOrder: LatestOrder
  }>(),
  {},
)

const { formatPrice } = useFormattedPrice()

// @todo extract into a utility
function getFormattedPrice(price: Ref<number> | number): string {
  const priceValue = isRef(price) ? price.value : price

  return formatPrice(priceValue, 0, 100).value
}
</script>

<template>
  <div v-if="latestOrder" class="card card-side bg-base-100 mt-10 shadow-xl">
    <div class="card-body">
      <h2 class="card-title flex justify-between">
        Latest order
        <span class="text-brand-600">{{ getFormattedPrice(latestOrder.total) }}</span>
      </h2>

      <ul>
        <li
          v-for="item in latestOrder.products"
          :key="item.id"
          class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
        >
          <slot :key="item.id" name="override-items-line" :item="item">
            <CoreStoreCustomerDashboardLatestOrderLineItem :key="item.id" :item="item" />
          </slot>
        </li>
      </ul>

      <p>
        Ordered on <span class="text-brand-600">{{ fromNow(latestOrder.created_at) }}</span>
      </p>
      <div class="card-actions justify-end">
        <button class="btn border-brand-500 bg-brand-500 hover:border-brand-600 hover:bg-brand-600">Track order</button>
      </div>
    </div>
  </div>
</template>
