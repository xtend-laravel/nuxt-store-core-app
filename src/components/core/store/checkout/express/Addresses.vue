<script setup lang="ts">
import Addresses from '../components/Addresses.vue'
import IconCheck from '~icons/carbon/checkmark-filled'
</script>

<template>
  <div>
    <div class="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
      <div class="flex items-center gap-6 font-medium">
        <button type="button" class="text-brand-500 flex items-center gap-1">
          <IconCheck class="h-4 w-4" />
          <span>Shipping address</span>
        </button>
        <button type="button" class="flex items-center gap-2 text-gray-300">
          <IconCheck class="h-4 w-4" />
          <span>Billing address</span>
        </button>
      </div>
      <a href="#" class="font-semibold uppercase !underline"> Create new address </a>
    </div>
    <Addresses current-step-key="shipping_address" type="express" />
  </div>
</template>
