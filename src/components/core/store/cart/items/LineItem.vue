<script setup lang="ts">
import { Popconfirm } from 'ant-design-vue'
import IconMinus from '~icons/carbon/subtract'
import IconAdd from '~icons/carbon/add'
import { useCartStore } from '#nuxt-store-core/store/cart'
import useProductRoute from '#nuxt-store-core/composables/useProductRoute'

const props = withDefaults(
  defineProps<{
    variantWrapClasses?: string
    variantOptionsListClasses?: string
    rightColumnWrapClasses?: string
    priceClasses?: string
    quantityWrapClasses?: string
    item: Record<string, any>
  }>(),
  {
    variantOptionsListClasses: 'variant-options-list flex gap-2 text-xs',
    variantWrapClasses: 'variant-wrap mt-1 text-xs text-gray-500',
    rightColumnWrapClasses: 'right-column mt-4 flex flex-col justify-between pt-10 sm:mt-0',
    priceClasses: 'price-style w-20 shrink-0 text-base font-semibold text-gray-900 sm:text-right',
    quantityWrapClasses: 'quantity-wrap mt-2 flex items-center',
  },
)

const cartStore = useCartStore()

const { formatPrice } = useFormattedPrice()

const purchasable = computed(() => props.item.purchasable)

const { url } = useProductRoute(props.item.product)

function getFormattedPrice(price: Ref<number> | number): string {
  const priceValue = isRef(price) ? price.value : price
  return formatPrice(priceValue, 0, 100).value
}

async function removeLine(item: any) {
  await cartStore.removeLine(item.id)
}

async function increaseQuantity(item: any) {
  if (item.quantity < item.product.stock) {
    item.quantity++
    await cartStore.updateQuantity(item.id, item.quantity)
  }
}

async function decreaseQuantity(item: any) {
  if (item.quantity > 1) {
    item.quantity--
    await cartStore.updateQuantity(item.id, item.quantity)
  }
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
    <div class="sm:col-gap-5 sm:flex">
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
        <div :class="quantityWrapClasses">
          <button
            type="button"
            :disabled="item.quantity === 1"
            class="z-20 flex h-6 w-6 items-center justify-center border border-r-0 border-neutral-200 bg-gray-50 hover:bg-gray-100"
            :class="{ 'cursor-not-allowed hover:bg-gray-50': item.quantity === 1 }"
            @click="decreaseQuantity(item)"
          >
            <IconMinus class="h-2 w-2" />
          </button>
          <input
            v-model="item.quantity"
            type="number"
            name="quantity"
            class="focus:border-brand-600 focus:ring-brand-600 z-10 inline-flex h-6 w-10 border border-neutral-200 px-2 py-2 text-center text-xs [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            inputmode="numeric"
            disabled
          />
          <button
            type="button"
            :disabled="item.quantity === item.product.stock"
            class="z-20 flex h-6 w-6 items-center justify-center border border-l-0 border-neutral-200 bg-gray-50 hover:bg-gray-100"
            :class="{ 'cursor-not-allowed hover:bg-gray-50': item.quantity === item.product.stock }"
            @click="increaseQuantity(item)"
          >
            <IconAdd class="h-2 w-2" />
          </button>
        </div>
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
