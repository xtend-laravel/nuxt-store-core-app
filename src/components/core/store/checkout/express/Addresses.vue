<script setup lang="ts">
import Addresses from "../components/Addresses.vue";
import IconCheck from '~icons/carbon/checkmark-filled'
</script>

<template>
  <div>
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center gap-6 font-medium">
        <button type="button" class="flex gap-2 items-center text-brand-500">
          <IconCheck class="w-4 h-4" /> <span>Shipping address</span>
        </button>
        <button type="button" class="flex gap-2 items-center text-gray-300">
          <IconCheck class="w-4 h-4" /> <span>Billing address</span>
        </button>
      </div>
      <a href="#" class="uppercase font-semibold !underline">Create new address</a>
    </div>
    <Addresses current-step-key="shipping_address" type="express" />
  </div>
</template>
