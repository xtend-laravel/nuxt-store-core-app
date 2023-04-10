<script setup lang="ts">
import useProductRoute from '#nuxt-store-core/composables/useProductRoute'

const props = defineProps<{
  item: any
  size: 'small' | 'medium' | 'large'
}>()

const { url } = useProductRoute(props.item)
const basePrice = ref(props.item.prices.basePrice)
const { formatPrice } = useFormattedPrice('EUR')
const formattedPrice = formatPrice(basePrice, 0, 100)
const formattedDiscountedPrice = formatPrice(basePrice, 50, 100)
</script>

<template>
  <div class="aspect-1 group flex-1">
    <NuxtLink class="relative block flex h-full w-full items-center justify-center overflow-hidden" :to="url">
      <!-- main image -->
      <img
        v-if="item.images.thumbnail"
        :src="item.images.thumbnail"
        class="relative left-1/2 min-h-full w-full -translate-x-1/2"
        :alt="item.name"
      />
      <!-- Else display placeholder image -->
      <img
        v-else
        src="https://via.placeholder.com/300x300/f8f8fa/000000/?text=No Image"
        class="relative left-1/2 min-h-full w-full -translate-x-1/2"
      />

      <!-- information -->
      <div
        class="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-neutral-900/30 px-4 transition duration-300 lg:-translate-y-full lg:group-hover:translate-y-0"
      >
        <h3 class="mb-2 text-center text-sm font-medium text-white" v-text="item.name" />

        <!-- pricing group -->
        <div class="flex flex-col items-center justify-center">
          <!-- old price -->
          <template v-if="Math.round(Math.random())">
            <div class="flex items-center gap-2">
              <span class="font-medium text-gray-400 line-through" v-text="formattedPrice" />
              <span class="rounded bg-red-500 px-1 py-0 text-xs font-semibold text-white">-69%</span>
            </div>
          </template>
          <!-- price -->
          <span class="text-brand-500 font-medium text-white" v-text="formattedDiscountedPrice" />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
