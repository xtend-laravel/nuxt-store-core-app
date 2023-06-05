<script setup lang="ts">
import { Popconfirm } from 'ant-design-vue'
import type { Ref } from 'vue'
import type { LineItem } from '#nuxt-store-core/types/product'
import { useCartStore } from '#nuxt-store-core/store/cart'
import useProductRoute from '#nuxt-store-core/composables/useProductRoute'

const props = defineProps<{
  variantContentClasses?: string
  variantOptionsListClasses?: string
  variantWrapClasses?: string
  rightColumnWrapClasses?: string
  priceClasses?: string
  quantityWrapClasses?: string
  item: LineItem
}>()

const {
  variantContentClasses = 'sm:col-gap-5 sm:flex',
  variantOptionsListClasses = 'variant-options-list flex gap-2 text-xs',
  variantWrapClasses = 'variant-wrap mt-1 text-xs text-gray-500',
  rightColumnWrapClasses = 'right-column mt-4 flex flex-col justify-between pt-10 sm:mt-0',
  priceClasses = 'price-style w-20 shrink-0 text-base font-semibold text-gray-900 sm:text-right',
  quantityWrapClasses = 'quantity-wrap mt-2 flex items-center',
} = props

const cartStore = useCartStore()

const purchasable = computed(() => props.item.purchasable)

const { url } = useProductRoute(props.item.product)

const { formatPrice } = useFormattedPrice()

// @todo make 100 the default value and use `formatPrice` directly instead?
function getFormattedPrice(price: Ref<number> | number): string {
  return formatPrice(unref(price), 0, 100).value
}

async function removeLine(item: any) {
  await cartStore.removeLine(item.id).then(() => {
    cartStore.fetch()
    // @todo if last item then we close the cart summary
  })
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

  <div class="relative flex flex-1 flex-col justify-between">
    <div :class="variantContentClasses">
      <div class="pr-4 sm:pr-2">
        <NuxtLink :to="url" class="text-base font-semibold text-gray-900" v-text="item.product.name" />
        <div :class="variantWrapClasses">
          <!-- variant options -->
          <ul :class="variantOptionsListClasses">
            <li v-for="optionValue in purchasable.values" :key="optionValue.id">
              <span><CoreStoreMultilingual :value="optionValue.option.name" />: </span>
              <span><CoreStoreMultilingual :value="optionValue.name" /></span>
            </li>
          </ul>
        </div>
      </div>

      <div :class="rightColumnWrapClasses">
        <p :class="priceClasses">
          {{ getFormattedPrice(item.total) }}
        </p>
        <slot name="line-item-quantity" :item="item">
          <CoreStoreCartItemsLineItemQuantity :item="item" :quantity-wrap-classes="quantityWrapClasses" />
        </slot>
      </div>
    </div>

    <!-- remove cart line button -->
    <div class="absolute right-0 top-0 flex sm:bottom-0 sm:top-0">
      <Popconfirm
        placement="topRight"
        title="Delete this product?"
        description="Are you sure want to delete this product?"
        @confirm.stop="removeLine(item)"
      >
        <button
          type="button"
          class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out hover:text-gray-900 focus:shadow"
        >
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class="" />
          </svg>
        </button>
      </Popconfirm>
    </div>
  </div>
</template>
