<script setup lang="ts">
import type { Component } from 'vue'
import CheckoutActionIcon from './CheckoutActionIcon.vue'

const props = withDefaults(
  defineProps<{
    checkoutActionClasses?: string
    checkoutActionLabel?: string
    icon?: Component
  }>(),
  {
    checkoutActionClasses: 'bg-gray-100 text-black hover:text-white',
    checkoutActionLabel: 'Checkout',
    icon: CheckoutActionIcon,
  },
)
</script>

<template>
  <div class="mt-6 text-center">
    <NuxtLink
      to="/checkout"
      class="inline-flex w-full items-center justify-center rounded-md px-6 py-4 text-lg font-semibold transition-all duration-200 ease-in-out hover:bg-gray-800 focus:text-white focus:shadow"
      :class="checkoutActionClasses"
    >
      <span v-text="checkoutActionLabel" />
      <Component :is="icon" class="ml-4 h-6 w-6 transition-all group-hover:ml-8" />
    </NuxtLink>
  </div>
</template>
