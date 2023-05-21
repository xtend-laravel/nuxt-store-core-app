<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <LayoutContainer class="mx-auto py-12">
    <div class="flex w-full flex-col gap-4 lg:flex-row">
      <!-- sidebar -->
      <div class="w-full lg:w-1/4">
        <PagesAccountSidebar />
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
  </LayoutContainer>
</template>
