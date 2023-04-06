<script setup lang="ts">
import type { Component } from 'vue'
import * as components from '#components'

const props = defineProps<{
  widget: Record<string, any>
}>()

const loadedComponent = components[props.widget.component] as Component
</script>

<template>
  <Component :is="loadedComponent" :widget="widget">
    <slot />
  </Component>
</template>
