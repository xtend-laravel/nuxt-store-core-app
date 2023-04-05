<script setup lang="ts">
import Badge from './Badge.vue'
import { useCartStore } from '#nuxt-store-core/store/cart'
import { useCategoryStore } from '#nuxt-store-core/store/category'
import { ProductListLayout } from '#nuxt-store-core/store/productList'
import { useGlobalStore } from '#nuxt-store-core/store/global'
import useProductRoute from '#nuxt-store-core/composables/useProductRoute'
import IconEdit from '~icons/carbon/shopping-cart-plus'
import IconFav from '~icons/carbon/favorite'
import IconView from '~icons/carbon/view'

const props = defineProps<{
  product: any
  layout: ProductListLayout
}>()
const globalStore = useGlobalStore()
const categoryStore = useCategoryStore()
const cartStore = useCartStore()
function addToCart(product: any) {
  cartStore.add(product.attributes.id)
}

const { url } = useProductRoute(props.product)
const basePrice = ref(props.product.attributes.prices.basePrice)
const { formatPrice } = useFormattedPrice('EUR')
const formattedPrice = formatPrice(basePrice, 0, 100)
const formattedDiscountedPrice = formatPrice(basePrice, 50, 100)

const isFavorite = computed(() => {
  return globalStore.favorites.includes(props.product.id)
})
function addToFavorite(product: any) {
  globalStore.addToFavorite(product.id)
}
</script>

<template>
  <div class="group flex h-full flex-1 rounded" :class="layout === 'list' ? 'flex-row' : 'flex-col'">
    <!-- main image  -->
    <div class="relative block overflow-hidden" :class="layout === 'list' ? 'w-1/3 max-w-[240px]' : ''">
      <!-- thumbnail -->
      <NuxtLink :to="url" class="relative w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
        <!-- main image -->
        <img
          v-if="product.attributes.images.thumbnail"
          :src="product.attributes.images.thumbnail"
          class="h-full w-full object-cover"
          :alt="product.attributes.name.en"
        />
        <!-- Else display placeholder image -->
        <img
          v-else
          src="https://via.placeholder.com/300x300/f8f8fa/000000/?text=No Image"
          class="h-full w-full object-cover"
          :class="layout === 'list' ? 'm-auto max-w-[195px]' : ''"
        />
        <!-- secondary image -->
        <div
          class="absolute left-0 top-0 flex h-full w-full transform items-center opacity-0 transition duration-300 group-hover:opacity-100"
        >
          <img
            v-if="product.attributes.images.gallery.length > 1"
            :src="product.attributes.images.gallery[1]"
            class="h-full w-full transform object-cover transition duration-300"
          />
        </div>
        <!-- information -->
        <div
          class="absolute bottom-0 left-0 flex h-full w-full flex-col items-center justify-end px-4 opacity-0 transition duration-700 lg:group-hover:opacity-100"
        >
          <div class="mb-3 flex items-center gap-2">
            <button
              class="bg-brand-300 text-xxs hover:bg-brand-500 focus:ring-brand-500 rounded-full border border-transparent p-2 font-medium uppercase text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
              @click.prevent="addToCart(product)"
            >
              <IconView class="h-4 w-4" />
            </button>
            <button
              class="bg-brand-400 text-xxs hover:bg-brand-600 focus:ring-brand-500 rounded-full border border-transparent p-2 font-medium uppercase text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
              :class="isFavorite ? 'bg-rose-500' : ''"
              @click.prevent="!isFavorite && addToFavorite(product)"
            >
              <IconFav class="h-4 w-4" />
            </button>
            <button
              class="bg-brand-500 text-xxs hover:bg-brand-700 focus:ring-brand-500 rounded-full border border-transparent p-2 font-medium uppercase text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
              @click.prevent="addToCart(product)"
            >
              <IconEdit class="h-4 w-4" />
            </button>
          </div>
        </div>
      </NuxtLink>
      <!-- badges -->
      <div class="absolute left-0 top-0 ml-2 mt-2 flex items-center gap-2">
        <Badge class="bg-red-500">
          On sale!
        </Badge>
        <Badge class="bg-black">
          All sold out!
        </Badge>
      </div>
    </div>

    <!-- information -->
    <div
      class="mt-4 flex w-full flex-col gap-1 px-2 text-center lg:px-6"
      :class="{
        'items-center justify-center': layout === 'grid',
        'items-start justify-start': layout === 'list',
      }"
    >
      <!-- brand -->
      <NuxtLink :to="url" class="text-sm font-semibold uppercase text-black lg:text-base">
        {{ product.attributes.brand }}
      </NuxtLink>
      <!-- title -->

      <NuxtLink :to="url">
        <h3
          class="text-gray-600"
          :class="layout === 'list' ? 'text-sm lg:text-base' : 'text-xs lg:text-sm'"
          v-text="product.attributes.name.en"
        />
      </NuxtLink>
      <!-- price section -->
      <div class="my-3 flex items-center gap-2 text-sm">
        <template v-if="Math.round(Math.random())">
          <span class="text-gray-500 line-through" v-text="formattedPrice" />
          <span class="text-xxs rounded rounded bg-red-500 px-1 font-medium text-white">-50%</span>
        </template>
        <!-- current price -->
        <span class="text-brand-500" v-text="formattedDiscountedPrice" />
      </div>

      <!-- options
      <select id="" name="" class="pl-2 pr-8 text-xs border border-neutral-200 py-1.5">
        <option value="">
          XXL
        </option>
        <option value="">
          XL
        </option>
      </select> -->
    </div>
  </div>
</template>
