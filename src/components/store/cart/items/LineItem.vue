<script setup lang="ts">
defineProps<{
  item: Record<string, any>
}>()

const { formatPrice } = useFormattedPrice('EUR')

function getFormattedPrice(price: Ref<number> | number): string {
  const priceValue = isRef(price) ? price.value : price
  return formatPrice(priceValue, 0, 1000).value
}
</script>

<template>
  <div class="relative shrink-0">
    <span
      class="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-right-2 sm:-top-2"
      v-text="item.quantity"
    />
    <img
      v-if="item.product"
      class="h-24 w-24 max-w-full rounded-lg object-cover"
      :src="item.product.images.thumbnail"
      :alt="item.product.name.en"
    />
  </div>

  <div class="relative flex flex-1 flex-col justify-between">
    <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
      <div class="pr-8 sm:pr-5">
        <p class="text-base font-semibold text-gray-900" v-text="item.product.name.en" />
      </div>

      <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
        <p class="w-20 shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
          {{ getFormattedPrice(item.total) }}
        </p>
      </div>
    </div>

    <div class="absolute right-0 top-0 flex sm:bottom-0 sm:top-auto">
      <button
        type="button"
        class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out hover:text-gray-900 focus:shadow"
      >
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class="" />
        </svg>
      </button>
    </div>
  </div>
</template>
