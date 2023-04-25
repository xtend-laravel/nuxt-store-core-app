<script setup lang="ts">
defineProps<{
  items: Record<string, any>
}>()
</script>

<template>
  <div class="flow-root">
    <ul>
      <li
        v-for="item in items"
        :key="item.id"
        class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
      >
        <slot :key="item.id" name="override-items-line" :item="item">
          <CoreStoreCartItemsLineItem :key="item.id" :item="item" />
        </slot>
      </li>
    </ul>
  </div>
</template>
