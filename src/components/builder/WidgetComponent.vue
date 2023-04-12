<script setup lang="ts">
import { resolveDynamicComponent } from 'vue'
import type { Component } from 'vue'

const props = defineProps<{
  widget: Record<string, any>
}>()

// Note all components must be prefixed with DataBuilderWidgets
const component = `CoreDataWidgets${props.widget.attributes.component}` as string
const themeComponent = component.substring(4) as string
const loadedComponent = (canResolveComponent(themeComponent) ? themeComponent : component) as Component

function canResolveComponent(name) {
  return typeof resolveDynamicComponent(name) !== 'string'
}
</script>

<template>
  <Component :is="loadedComponent" :widget="widget.attributes">
    <slot />
  </Component>
</template>
