<script setup lang="ts"></script>

<template>
  <!-- Not items in cart -->
  <div class="flex h-full flex-col items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-700">
        Your cart is empty
      </h1>
      <p class="text-gray-600">
        Please add some items to your cart
      </p>
      <div class="mt-6">
        <NuxtLink
          class="bg-brand-50 text-brand-500 hover:bg-brand-100 hover:text-brand-600 mt-4 cursor-pointer rounded-full py-2 px-4 font-semibold uppercase"
          to="/"
        >
          Continue shopping
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
