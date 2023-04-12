<script setup lang="ts">
defineProps<{
  heading: string
}>()
</script>

<template>
  <h1 class="text-2xl font-bold uppercase" v-text="heading" />
</template>
