<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    value?: string
    description?: string
    wrapperClasses?: string
    iconWrapperClasses?: string
    titleClasses?: string
    valueClasses?: string
    descriptionClasses?: string
  }>(),
  {
    wrapperClasses: 'stat place-items-center',
    iconWrapperClasses: 'stat-figure text-brand-500',
    titleClasses: 'stat-title',
    valueClasses: 'stat-value',
    descriptionClasses: 'stat-desc',
  },
)
</script>

<template>
  <div :class="wrapperClasses">
    <div :class="iconWrapperClasses">
      <slot name="icon" />
    </div>
    <div :class="titleClasses">
      <slot name="title">{{ title }}</slot>
    </div>
    <div :class="valueClasses">
      <slot name="value">{{ value }}</slot>
    </div>
    <div :class="descriptionClasses">
      <slot name="description">{{ description }}</slot>
    </div>
  </div>
</template>
