<script setup lang="ts">
defineProps<{
  navigation: {
    name: string
    href: string
  }[]
  title: string
}>()
</script>

<template>
  <CoreLayoutContainer class="mx-auto py-12">
    <div class="flex w-full flex-col gap-4 lg:flex-row">
      <!-- sidebar -->
      <div class="w-full lg:w-1/4">
        <CoreStoreCustomerLayoutSidebarNav :items="navigation" />
      </div>
      <div class="h-full w-full grow">
        <h1 class="mb-12 text-2xl font-bold">
          {{ title }}
        </h1>
        <div>
          <slot />
        </div>
      </div>
    </div>
  </CoreLayoutContainer>
</template>
