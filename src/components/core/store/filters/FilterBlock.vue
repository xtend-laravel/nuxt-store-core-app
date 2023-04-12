<script setup lang="ts">
import FilterGroup from './Group.vue'
</script>

<template>
  <div class="border border-neutral-200 p-8">
    <strong class="mb-5 block text-lg uppercase">Filter by</strong>
    <div class="flex flex-col text-sm">
      <FilterGroup title="Categories" :open="true"> </FilterGroup>
      <FilterGroup title="Price" :open="true">
        <div class="w-full"></div>
      </FilterGroup>
      <FilterGroup title="Brands" :open="true"> </FilterGroup>
      <!-- colors -->
      <FilterGroup title="Colors"> </FilterGroup>
    </div>
  </div>
</template>
