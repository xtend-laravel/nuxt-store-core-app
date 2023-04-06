<script setup lang="ts">
import type { Component } from 'vue'
import * as components from '#components'

const props = defineProps<{
  widget: Record<string, any>
}>()

// Note all components must be prefixed with DataBuilderWidgets
const component = props.widget.component as string
const themeComponent = component.replace('DataBuilderWidgets', '')

const loadedComponent = (
  process.env.NODE_ENV === 'production'
    ? themeComponent || component
    : components[themeComponent] || components[component]
) as Component
</script>

<template>
  <Component :is="loadedComponent" :widget="widget">
    <slot />
  </Component>
</template>
