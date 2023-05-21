<script setup lang="ts">
import type { LatestOrder } from '#nuxt-store-core/store/customer/dashboard'

const props = withDefaults(
  defineProps<{
    latestOrder: LatestOrder
  }>(),
  {},
)
// @todo Dynamic should include all products in an order stacked - use your judgement on the design based on daisyUI
</script>

<template>
  <div class="card card-side bg-base-100 mt-10 shadow-xl">
    <figure class="m-0">
      <img src="https://picsum.photos/seed/picsum/200/300" class="w-60" alt="..." />
    </figure>
    <div class="card-body">
      <h2 class="card-title flex justify-between">
        Latest order
        <span class="text-brand-600">&euro;100.50</span>
      </h2>
      <p class="text-base text-gray-600">Product name</p>
      <ul class="flex gap-2">
        <li>
          <span><span>Color</span>: </span><span><span>Red</span></span>
        </li>
        <li>
          <span><span>Size</span>: </span><span><span>36 1/2</span></span>
        </li>
      </ul>
      <p>
        Ordered on <span class="text-brand-600">{{ new Date().toLocaleDateString() }}</span>
      </p>
      <div class="card-actions justify-end">
        <button class="btn border-brand-500 bg-brand-500 hover:border-brand-600 hover:bg-brand-600">Track order</button>
      </div>
    </div>
  </div>
</template>
