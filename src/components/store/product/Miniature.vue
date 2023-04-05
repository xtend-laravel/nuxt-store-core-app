<script setup lang="ts"></script>

<template>
  <div class="group relative">
    <div class="relative">
      <!-- thumbnail -->
      <div
        class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
      >
        <img
          src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
          alt="Front of men&#039;s Basic Tee in black."
          class="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <!-- badges -->
      <div class="absolute top-0 left-0 ml-2 mt-2 flex items-center gap-2">
        <Badge class="bg-red-500">
          On sale!
        </Badge>
        <Badge class="bg-black">
          All sold out!
        </Badge>
      </div>
    </div>
    <div class="mt-4 flex flex-col items-center justify-center gap-1">
      <a href="#" class="text-sm font-semibold uppercase">hogan</a>
      <h3 class="text-center text-sm text-gray-700">
        <a href="#">Running H261 - Leather sneakers with leopard buttress</a>
      </h3>
      <!-- price section -->
      <div class="flex items-center gap-2 text-sm">
        <template v-if="Math.round(Math.random())">
          <span class="text-gray-500 line-through">€330.00</span>
          <span class="rounded rounded bg-red-500 px-1 text-xxs font-medium text-white">-50%</span>
        </template>
        <!-- current price -->
        <span class="text-brand-500">€330.00</span>
      </div>
      <!-- options -->
      <select id="" name="" class="border border-neutral-200 py-1.5 pl-2 pr-8 text-xs">
        <option value="">
          XXL
        </option>
        <option value="">
          XL
        </option>
      </select>
    </div>
  </div>
</template>
