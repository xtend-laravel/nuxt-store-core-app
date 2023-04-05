<script setup lang="ts">
import type { Component } from 'vue'
import useComponent from '../../../composables/useComponent'

const props = defineProps<{
  widget: Record<string, any>
}>()

const loadedComponent = useComponent(`data/builder/widgets/${props.widget.type}/${props.widget.component}`) as Component
</script>

<template>
  <div>
    <Component :is="loadedComponent" :widget="widget">
      <slot />
    </Component>
  </div>
</template>
