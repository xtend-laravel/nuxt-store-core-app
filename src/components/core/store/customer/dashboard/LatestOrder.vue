<script setup lang="ts">
import { computed } from 'vue'
import type { LatestOrder } from '#nuxt-store-core/store/customer/dashboard'

const props = withDefaults(
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
    bodyClasses: '',
    titleClasses: 'card-title flex justify-between',
    actionsClasses: 'card-actions justify-end',
    descriptionClasses: '',
    lineWrapperClasses: 'flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0',
  },
)

const { formatPrice } = useFormattedPrice()

const images = computed(() => {
  return props.latestOrder?.products?.map((item) => item?.product?.images?.thumbnail)
})

const primaryImage = ref(images.value?.[0])

// @todo make 100 the default value and use `formatPrice` directly instead?
function getFormattedPrice(price: Ref<number> | number): string {
  return formatPrice(unref(price), 0, 100).value
}
</script>

<template>
  <div v-if="latestOrder" class="card card-side bg-base-100 my-10 shadow-xl">
    <figure class="m-0">
      <img :src="images[0]" class="h-96 w-72 rounded-lg object-cover" />
    </figure>
    <div class="card-body py-2">
      <div class="flex justify-between">
        <h2 class="card-title" :class="titleClasses">
          Latest order
          <span class="text-brand-600">{{ getFormattedPrice(latestOrder?.total) }}</span>
          <span>(50 items)</span>
        </h2>
        <div class="order-item-thumbs">
          <ul class="flex gap-4">
            <li v-for="image in images" :key="image" class="h-12 w-12 border bg-gray-100">
              <img :src="image" class="h-12 w-12 max-w-full rounded-lg object-cover" />
            </li>
          </ul>
        </div>
      </div>
      <div :class="containerClasses">
        <div :class="bodyClasses">
          <CoreStoreCustomerDashboardLatestOrderProductTable :items="latestOrder.products" />
          <!--          <ul> -->
          <!--            <li v-for="item in latestOrder.products" :key="item.id" :class="lineWrapperClasses"> -->
          <!--              <slot :key="item.id" name="override-items-line" :item="item"> -->
          <!--                <CoreStoreCustomerDashboardLatestOrderLineItem -->
          <!--                  :key="item.id" -->
          <!--                  :wrapper-classes="lineWrapperClasses" -->
          <!--                  :variant-content-classes="lineVariantContentClasses" -->
          <!--                  :variant-wrap-classes="lineVariantWrapClasses" -->
          <!--                  :variant-options-list-classes="lineVariantOptionsListClasses" -->
          <!--                  :price-classes="linePriceClasses" -->
          <!--                  :quantity-wrap-classes="lineQuantityWrapClasses" -->
          <!--                  :item="item" -->
          <!--                /> -->
          <!--              </slot> -->
          <!--            </li> -->
          <!--          </ul> -->
        </div>
      </div>
      <div class="card-actions mt-4 justify-end">
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
  </div>
</template>
