<script setup lang="ts">
import IconChevronDown from '~icons/carbon/chevron-down'

defineProps<{
  title: string
  open?: boolean
}>()
</script>

<template>
  <details class="border-b border-neutral-200 pb-1 pt-4" :open="open">
    <summary class="flex cursor-pointer items-center justify-between pb-3">
      <span class="font-medium">{{ title }}</span>
      <IconChevronDown />
    </summary>

    <slot />
  </details>
</template>
