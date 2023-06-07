<script setup lang="ts">
import { Collapse } from 'vue-collapsed'

defineProps<{
  isActive: boolean
}>()
</script>

<template>
  <Collapse :when="isActive" class="v-collapse overflow-hidden !p-4 text-sm text-gray-500">
    <slot />
  </Collapse>
</template>
