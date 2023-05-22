<script setup lang="ts">
import HeadingIcon from './HeadingIcon.vue'
import ChevronUpIcon from '~icons/carbon/chevron-up'

const props = withDefaults(
  defineProps<{
    title: string
    isActive: boolean
    url: string
    iconCompletedClasses?: string
    completedStepClasses?: string
    activePanelClasses?: string
    inactivePanelClasses?: string
    panelIconClasses?: string
  }>(),
  {
    iconCompletedClasses: 'text-black',
    completedStepClasses: 'bg-slate-300 text-white',
    activePanelClasses: 'bg-black text-white',
    inactivePanelClasses: 'border bg-slate-50',
    panelIconClasses: 'text-slate-300',
  },
)
</script>

<template>
  <NuxtLink
    class="flex w-full cursor-pointer items-center justify-between rounded-t-xl p-4"
    :class="[isActive ? activePanelClasses : inactivePanelClasses]"
    :to="url"
  >
    <span class="flex items-center">
      <slot name="panel-header-icon">
        <HeadingIcon />
      </slot>

      <slot name="panel-header-heading">
        <span class="ml-2 text-sm font-semibold text-black" :class="{ 'text-white': isActive }" v-text="title" />
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
