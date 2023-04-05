<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFilterStore } from '#nuxt-store-core/store/filters'
import { useProductListStore } from '#nuxt-store-core/store/productList'

const { items, countItems } = storeToRefs(useProductListStore())
const productListStore = useProductListStore()
const filterStore = useFilterStore()
const sortBy = ref('default')
const sortOptions = ref([
  { label: 'Default', value: 'default' },
  { label: 'Name, A to Z', value: 'name' },
  { label: 'Name, Z to A', value: '-name' },
  { label: 'Price, low to high', value: 'price' },
  { label: 'Price, high to low', value: '-price' },
])

async function applySortBy() {
  productListStore.setSortBy(sortBy.value)
  await filterStore.apply({
    onScroll: false,
  })
}
</script>

<template>
  <div class="flex items-center justify-end text-sm">
    <label for="sort-by" class="mr-4 inline-block">Sort by: </label>
    <select id="sort-by" v-model="sortBy" class="rounded-md border border-neutral-300 px-2 py-1" @change="applySortBy">
      <option v-for="option in sortOptions" :key="option.value" :value="option.value" v-text="option.label" />
    </select>
  </div>
</template>
