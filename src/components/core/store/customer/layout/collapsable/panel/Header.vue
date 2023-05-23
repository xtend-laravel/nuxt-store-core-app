<script setup lang="ts">
import HeadingIcon from './HeadingIcon.vue'
import ChevronUpIcon from '~icons/carbon/chevron-up'

withDefaults(
  defineProps<{
    title: string
    isActive: boolean
    url: string
    wrapperClasses?: string
    activeWrapperClasses?: string
    inactiveWrapperClasses?: string
    contentClasses?: string
    titleClasses?: string
    activeTitleClasses?: string
    inactiveTitleClasses?: string
  }>(),
  {
    wrapperClasses: 'flex w-full cursor-pointer items-center justify-between rounded-t-xl p-4',
    activeWrapperClasses: 'bg-black text-white',
    inactiveWrapperClasses: 'border bg-slate-50',
    contentClasses: 'flex items-center',
    titleClasses: 'ml-2 text-sm font-semibold',
    inactiveTitleClasses: 'text-black',
    activeTitleClasses: 'text-white',
  },
)
</script>

<template>
  <NuxtLink :class="[wrapperClasses, isActive ? activeWrapperClasses : inactiveWrapperClasses]" :to="url">
    <span :class="contentClasses">
      <slot name="panel-header-icon">
        <HeadingIcon />
      </slot>

      <slot name="panel-header-heading">
        <span :class="[titleClasses, isActive ? activeTitleClasses : inactiveTitleClasses]" v-text="title" />
      </slot>
    </span>

    <ChevronUpIcon
      class="h-5 w-5"
      :class="{
        'rotate-180': isActive,
      }"
    />
  </NuxtLink>
</template>
