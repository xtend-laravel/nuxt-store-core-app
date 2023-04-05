<script setup lang="ts">
import HeadingIcon from './HeadingIcon.vue'
import ChevronUpIcon from '~icons/carbon/chevron-up'
import IconCheck from '~icons/carbon/checkmark-filled'

const props = withDefaults(
  defineProps<{
    step: any
    currentStep: number
    iconCompletedClasses?: string
    completedStepClasses?: string
    currentStepClasses?: string
    inactiveStepClasses?: string
    panelIconClasses?: string
  }>(),
  {
    iconCompletedClasses: 'text-black',
    completedStepClasses: 'bg-slate-300 text-white',
    currentStepClasses: 'bg-black text-white',
    inactiveStepClasses: 'border bg-slate-50',
    panelIconClasses: 'text-slate-300',
  },
)
</script>

<template>
  <button
    class="flex w-full cursor-pointer items-center justify-between rounded-t-xl p-4"
    :class="[
      currentStep === step.index ? currentStepClasses : inactiveStepClasses,
      step.completed ? completedStepClasses : '',
    ]"
    @click="step.completed ? null : $emit('accordion', step)"
  >
    <span class="flex items-center">
      <slot name="panel-header-icon">
        <HeadingIcon :step="step" />
      </slot>
      <slot name="panel-header-heading">
        <span
          class="ml-2 text-sm font-semibold text-black"
          :class="{ 'text-white': currentStep === step.index || step.completed }"
          v-text="step.title"
        />
      </slot>
    </span>
    <ChevronUpIcon
      v-if="!step.completed"
      class="h-5 w-5"
      :class="[
        currentStep === step.index ? 'rotate-180 transform' : '',
        step.completed ? 'text-white' : iconCompletedClasses,
      ]"
    />
    <span v-else class="rounded-full bg-white">
      <IconCheck class="h-7 w-7" :class="iconCompletedClasses" />
    </span>
  </button>
</template>
