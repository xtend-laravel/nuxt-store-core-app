<script setup lang="ts">
defineProps<{
  navigation: {
    title: string
    href?: string
    icon?: string
    action?: CallableFunction
  }[]
  title: string
  navigationListClasses?: string
  navigationListItemClasses?: string
  navigationListItemIconClasses?: string
}>()
</script>

<template>
  <section class="mx-auto max-w-screen-2xl py-12">
    <div class="flex w-full flex-col gap-4 lg:flex-row">
      <!-- sidebar -->
      <div class="w-full lg:w-1/4">
        <CoreStoreCustomerLayoutSidebarNav
          :items="navigation"
          :list-classes="navigationListClasses"
          :list-item-classes="navigationListItemClasses"
          :list-item-icon-classes="navigationListItemIconClasses"
        />
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
  </section>
</template>
