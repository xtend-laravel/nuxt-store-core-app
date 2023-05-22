<script setup lang="ts">
import useProductRoute from '#nuxt-store-core/composables/useProductRoute'

const props = withDefaults(
  defineProps<{
    variantWrapClasses: string
    variantOptionsListClasses: string
    rightColumnWrapClasses: string
    priceClasses: string
    quantityWrapClasses: string
    item: Record<string, any>
  }>(),
  {
    variantContentClasses: 'sm:col-gap-5 sm:flex',
    variantOptionsListClasses: 'variant-options-list flex gap-2 text-xs',
    variantWrapClasses: 'variant-wrap mt-1 text-xs text-gray-500',
    rightColumnWrapClasses: 'right-column mt-4 flex flex-col justify-between pt-10 sm:mt-0',
    priceClasses: 'price-style w-20 shrink-0 text-base font-semibold text-gray-900 sm:text-right',
    quantityWrapClasses: 'quantity-wrap mt-2 flex items-center',
  },
)

const { url } = useProductRoute(props.item.product)

const { formatPrice } = useFormattedPrice()

// @todo extract into a utility
function getFormattedPrice(price: Ref<number> | number): string {
  const priceValue = isRef(price) ? price.value : price

  return formatPrice(priceValue, 0, 100).value
}
</script>

<template>
  <div class="relative shrink-0">
    <span
      class="text-xxs absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full border bg-black/50 font-semibold text-white shadow sm:-right-2 sm:-top-2"
      v-text="item.quantity"
    />
    <img
      v-if="item.product"
      class="h-24 w-24 max-w-full rounded-lg object-cover"
      :src="item.product.images.thumbnail"
      :alt="item.product.name"
    />
  </div>

  <div class="relative flex flex-1 flex-col gap-4">
    <div :class="variantContentClasses">
      <div class="pr-4 sm:pr-2">
        <NuxtLink :to="url" class="text-base font-semibold text-gray-900" v-text="item.product.name" />
        <div :class="variantWrapClasses">
          <!-- variant options -->
          <ul :class="variantOptionsListClasses">
            <li v-for="optionValue in item.purchasable.values" :key="optionValue.id">
              <span><CoreStoreMultilingual :value="optionValue.option.name" />: </span>
              <span><CoreStoreMultilingual :value="optionValue.name" /></span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="price-style w-20 shrink-0 text-base font-semibold text-gray-900">
      {{ getFormattedPrice(item.total) }}
    </div>
  </div>
</template>
