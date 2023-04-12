<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ProductListLayout, useProductListStore } from '#nuxt-store-core/store/productList'
import IconList from '~icons/carbon/list'
import IconGrid from '~icons/carbon/grid'

const productListStore = useProductListStore()

const { layout } = storeToRefs(productListStore)

function setLayout(layout: ProductListLayout) {
  productListStore.setLayout(layout)
}
</script>

<template>
  <div class="flex gap-2">
    <button
      type="button"
      class="hover:text-neutral-600"
      :class="layout === 'grid' ? 'text-neutral-600' : 'text-neutral-300'"
      @click="setLayout('grid')"
    >
      <IconGrid class="h-5 w-5" />
    </button>
    <button
      type="button"
      class="hover:text-neutral-600"
      :class="layout === 'list' ? 'text-neutral-600' : 'text-neutral-300'"
      @click="setLayout('list')"
    >
      <IconList class="h-5 w-5" />
    </button>
  </div>
</template>
