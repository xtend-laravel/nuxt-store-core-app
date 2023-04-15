<script setup lang="ts">
import { useCartStore } from "~/store/cart";
const { items} = useCartStore()
</script>

<template>
  <div>
    <div class="px-4 py-6 sm:px-8 sm:py-10">
      <div class="flow-root">
        <ul class="-my-8">
          <li
            v-for="item in items"
            :key="item.id"
            class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
          >
            <slot :key="item.id" name="override-items-line" :item="item">
              <CoreStoreCartItemsLineItem :key="item.id" :item="item" />
            </slot>
          </li>
        </ul>
      </div>

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
