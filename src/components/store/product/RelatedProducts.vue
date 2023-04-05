<script setup lang="ts"></script>

<template>
  <div>
    <h3 class="text-center text-xl font-semibold uppercase tracking-wider">
      Related products
    </h3>
    <p class="py-2 text-center text-sm font-thin">
      8 other products in the same categories
    </p>

    <div class="mt-4 grid grid-cols-4 gap-6">
      <template v-for="i in [1, 2, 3, 4]" :key="i">
        <Miniature />
      </template>
    </div>
  </div>
</template>
