<script setup lang="ts">
defineProps<{
  code: string
  name: string
}>()
</script>

<template>
  <div class="flex items-center gap-4">
    <span class="text-xs" v-text="name" />
    <img :alt="name" :src="`/images/${code}.png`" class="w-5" />
  </div>
</template>
