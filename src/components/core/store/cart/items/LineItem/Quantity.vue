<script setup lang="ts">
import { useCartStore } from '#nuxt-store-core/store/cart'
import IconAdd from '~icons/carbon/add'
import IconSubtract from '~icons/carbon/subtract'

const props = defineProps<{
  item: any
  quantityWrapClasses?: string
  decreaseQuantityClasses?: string
  increaseQuantityClasses?: string
  quantityInputClasses?: string
}>()

const {
  decreaseQuantityClasses = 'z-20 flex h-6 w-6 items-center justify-center border border-r-0 border-neutral-200 bg-gray-50 hover:bg-gray-100',
  increaseQuantityClasses = 'z-20 flex h-6 w-6 items-center justify-center border border-r-0 border-neutral-200 bg-gray-50 hover:bg-gray-100',
  quantityInputClasses = 'focus:border-brand-600 focus:ring-brand-600 z-10 inline-flex h-6 w-10 border border-neutral-200 px-2 py-2 text-center text-xs [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
} = props

const cartStore = useCartStore()

async function increaseQuantity(item: any) {
  if (item.quantity < item.product.stock) {
    item.quantity++
    await cartStore.increaseQty(item.id, item.quantity).then(() => {
      cartStore.fetch()
    })
  }
}

async function decreaseQuantity(item: any) {
  if (item.quantity > 1) {
    item.quantity--
    await cartStore.decreaseQty(item.id, item.quantity).then(() => {
      cartStore.fetch()
    })
  }
}
</script>

<template>
  <div :class="quantityWrapClasses">
    <button
      type="button"
      :disabled="item.quantity === 1"
      :class="[decreaseQuantityClasses, item.quantity === 1 ? 'cursor-not-allowed hover:bg-gray-50' : '']"
      @click="decreaseQuantity(item)"
    >
      <IconSubtract class="h-2 w-2" />
    </button>

    <input
      v-model="item.quantity"
      type="number"
      name="quantity"
      :class="quantityInputClasses"
      inputmode="numeric"
      disabled
    />

    <button
      type="button"
      :disabled="item.quantity === item.product.stock"
      :class="[
        increaseQuantityClasses,
        item.quantity === item.product.stock ? 'cursor-not-allowed hover:bg-gray-50' : '',
      ]"
      @click="increaseQuantity(item)"
    >
      <IconAdd class="h-2 w-2" />
    </button>
  </div>
</template>
