<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <CoreLayoutContainer class="mx-auto py-12">
    <div class="h-full w-full grow">
      <h1 class="mb-12 text-2xl font-bold">
        {{ title }}
      </h1>
      <div>
        <slot />
      </div>
    </div>
  </CoreLayoutContainer>
</template>
