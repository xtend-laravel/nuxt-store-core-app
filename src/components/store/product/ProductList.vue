<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductListStore } from '#nuxt-store-core/store/productList'
import { useFilterStore } from '#nuxt-store-core/store/filters'

const filterStore = useFilterStore()
const productListStore = useProductListStore()
const { layout } = storeToRefs(productListStore)

async function loadMore() {
  productListStore.loadMore()
  await filterStore.apply({
    onScroll: true,
  })
}
</script>

<template>
  <div>
    <div
      class="grid gap-6"
      :class="{
        'grid-cols-1': layout === 'list',
        'grid-cols-2 xl:grid-cols-3': layout === 'grid',
      }"
    >
      <template v-for="item in productListStore.items" :key="item.id">
        <ProductItem :product="item" :layout="layout" />
      </template>
    </div>
    <!-- Infinite scroll -->
    <div v-if="productListStore.meta.to" class="mt-10 flex justify-center">
      <button
        type="button"
        class="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 py-3 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
        @click="loadMore"
      >
        Load more
      </button>
    </div>
  </div>
</template>
