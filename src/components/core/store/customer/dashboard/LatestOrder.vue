<script setup lang="ts">
import { fromNow } from '#nuxt-store-core/utils/fromNow'
import type { LatestOrder } from '#nuxt-store-core/store/customer/dashboard'

withDefaults(
  defineProps<{
    latestOrder: LatestOrder | null
    containerClasses?: string
    bodyClasses?: string
    titleClasses?: string
    actionsClasses?: string
    descriptionClasses?: string
    lineWrapperClasses?: string
    lineVariantContentClasses?: string
    lineVariantWrapClasses?: string
    lineVariantOptionsListClasses?: string
    linePriceClasses?: string
    lineQuantityWrapClasses?: string
  }>(),
  {
    containerClasses: 'card card-side bg-base-100 mt-10 shadow-xl',
    bodyClasses: 'card-body',
    titleClasses: 'card-title flex justify-between',
    actionsClasses: 'card-actions justify-end',
    descriptionClasses: '',
    lineWrapperClasses: 'flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0',
  },
)

const { formatPrice } = useFormattedPrice()

// @todo make 100 the default value and use `formatPrice` directly instead?
function getFormattedPrice(price: Ref<number> | number): string {
  return formatPrice(unref(price), 0, 100).value
}
</script>

<template>
  <div v-if="latestOrder" :class="containerClasses">
    <div :class="bodyClasses">
      <h2 :class="titleClasses">
        Latest order
        <span class="text-brand-600">{{ getFormattedPrice(latestOrder.total) }}</span>
      </h2>

      <ul>
        <li v-for="item in latestOrder.products" :key="item.id" :class="lineWrapperClasses">
          <slot :key="item.id" name="override-items-line" :item="item">
            <CoreStoreCustomerDashboardLatestOrderLineItem
              :key="item.id"
              :wrapper-classes="lineWrapperClasses"
              :variant-content-classes="lineVariantContentClasses"
              :variant-wrap-classes="lineVariantWrapClasses"
              :variant-options-list-classes="lineVariantOptionsListClasses"
              :price-classes="linePriceClasses"
              :quantity-wrap-classes="lineQuantityWrapClasses"
              :item="item"
            />
          </slot>
        </li>
      </ul>

      <p :class="descriptionClasses">
        <slot name="description">
          Ordered <span class="text-brand-600">{{ fromNow(latestOrder.created_at) }}</span>
        </slot>
      </p>

      <div :class="actionsClasses">
        <slot name="actions">
          <button class="btn border-brand-500 bg-brand-500 hover:border-brand-600 hover:bg-brand-600">
            Track order
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>
