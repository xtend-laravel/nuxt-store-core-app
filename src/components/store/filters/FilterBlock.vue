<script setup lang="ts">
import { storeToRefs } from 'pinia'
import FilterGroup from './Group.vue'
import { useExtendedCategoryStore } from '~/store/category'
import { useExtendedBrandStore } from '~/store/brand'

const categoryStore = useExtendedCategoryStore()
const brandStore = useExtendedBrandStore()

const { filterGroups } = storeToRefs(
  Object.keys(categoryStore.currentCategory).length ? categoryStore : brandStore,
) as any
</script>

<template>
  <div class="border border-neutral-200 p-8">
    <strong class="mb-5 block text-lg uppercase">Filter by</strong>
    <FilterByKeyword />
    <div class="flex flex-col text-sm">
      <FilterGroup title="Categories" :open="true">
        <FilterByCategories :categories="filterGroups.categories" />
      </FilterGroup>
      <FilterGroup title="Price" :open="true">
        <div class="w-full">
          <FilterByPriceRange
            :range="{
              min: filterGroups.price.min,
              max: filterGroups.price.max,
            }"
          />
        </div>
      </FilterGroup>
      <FilterGroup title="Brands" :open="true">
        <FilterByBrands :brands="filterGroups.brands" />
      </FilterGroup>
      <!-- colors -->
      <FilterGroup title="Colors">
        <CheckboxGroup class="flex-wrap" name="color" :options="['Red', 'Blue', 'Green', 'Orange', 'Cyan']" />
      </FilterGroup>
    </div>
  </div>
</template>
