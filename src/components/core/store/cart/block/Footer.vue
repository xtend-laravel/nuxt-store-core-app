<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    dismissClasses?: string
    dismissLabel?: string
    dismissAction?: () => void
  }>(),
  {
    dismissClasses: 'bg-gray-100 focus:ring-gray-200 border-gray-200 shadow-sm',
    dismissLabel: 'Close',
    dismissAction: () => false,
  },
)
</script>

<template>
  <div class="flex flex-shrink-0 justify-end px-4 py-4">
    <button
      type="button"
      class="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
      :class="dismissClasses"
      @click="dismissAction"
      v-text="dismissLabel"
    />
  </div>
</template>
