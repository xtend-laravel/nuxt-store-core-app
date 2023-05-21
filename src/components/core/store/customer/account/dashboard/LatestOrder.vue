<script setup lang="ts">
import type { LatestOrder } from '~/store/accountDashboard'

const props = withDefaults(
  defineProps<{
    latestOrder: LatestOrder
  }>(),
  {},
)
</script>

<template>
  <div class="card card-side bg-base-100 mt-10 shadow-xl">
    <figure class="m-0">
      <img src="https://jacquesloup.fra1.digitaloceanspaces.com/images/8887/16496.jpeg" class="w-60" alt="..." />
    </figure>
    <div class="card-body">
      <h2 class="card-title flex justify-between">
        Latest order
        <span class="text-brand-600">&euro;100.50</span>
      </h2>
      <p class="text-base text-gray-600">High-heeled leather mules with asymmetrical design 50</p>
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
