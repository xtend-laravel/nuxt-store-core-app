<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCartStore } from '~/store/cart'

const cartStore = useCartStore()

const { items } = storeToRefs(cartStore)
</script>

<template>
  <div>
    <div class="px-4 py-6 sm:py-6">
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
