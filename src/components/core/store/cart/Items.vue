<script setup lang="ts">
import { useCartStore } from '~/store/cart'

const { items } = useCartStore()
</script>

<template>
  <div>
    <div class="px-4 py-6 sm:px-8 sm:py-10">
      <slot name="override-items-list" :items="items">
        <CoreStoreCartItemsList :items="items" />
      </slot>

      <div>
        <slot name="override-items-summary">
          <CoreStoreCartItemsSummary />
        </slot>
      </div>
      <slot name="override-footer-actions">
        <CoreStoreCartItemsFooterActions />
      </slot>
    </div>
  </div>
</template>
