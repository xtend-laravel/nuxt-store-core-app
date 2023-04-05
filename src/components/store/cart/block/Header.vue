<script setup lang="ts">
import type { Component } from 'vue'
import HeaderIcon from './HeaderIcon.vue'

const props = withDefaults(
  defineProps<{
    heading: string
    icon?: Component
  }>(),
  {
    heading: 'Cart summary',
    icon: HeaderIcon,
  },
)

const heading = ref(props.heading)
const icon = ref(props.icon)
</script>

<template>
  <div class="bg-black p-4">
    <h2 class="mb-0 text-lg font-medium text-white">
      <span class="flex items-center">
        <Component :is="icon" />
        <span class="ml-2" v-text="heading" />
      </span>
    </h2>
  </div>
</template>
