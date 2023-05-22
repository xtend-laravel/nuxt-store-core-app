<script setup lang="ts">
import { Collapse } from 'vue-collapsed'

defineProps<{
  isActive: boolean
}>()
</script>

<template>
  <Collapse :when="isActive" class="v-collapse overflow-hidden !px-10 !pb-10 !pt-4 text-sm text-gray-500">
    <slot />
  </Collapse>
</template>

<style>
.v-collapse {
  transition: height var(--vc-auto-duration) cubic-bezier(0.33, 1, 0.68, 1);
}
</style>
