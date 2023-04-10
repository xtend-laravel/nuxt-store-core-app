<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'

const props = withDefaults(
  defineProps<{
    direction?: string
    completedStepClasses?: string
    currentStepClasses?: string
    inactiveStepClasses?: string
  }>(),
  {
    direction: 'horizontal',
    completedStepClasses: 'bg-slate-300 text-white',
    currentStepClasses: 'bg-black text-white',
    inactiveStepClasses: 'border bg-slate-50',
  },
)
const checkoutStore = useCheckoutStore()
const { steps, currentStep } = storeToRefs(checkoutStore)
function getStepClasses(step: any) {
  return {
    [props.completedStepClasses]: step.completed,
    [props.currentStepClasses]: step.index === currentStep.value,
    [props.inactiveStepClasses]: !step.completed && step.index !== currentStep.value,
  }
}
</script>

<template>
  <div>
    <div v-for="step in steps" :key="step.index" class="flex items-center">
      <div class="flex h-8 w-8 items-center justify-center rounded-full" :class="getStepClasses(step)">
        <span v-text="step.index + 1" />
      </div>
      <div class="ml-4 flex flex-row items-center gap-2">
        <span v-text="step.title" />
        <span v-if="step.index !== steps.length - 1">
          <span v-if="step.completed" class="hidden h-0.5 w-10 md:block" :class="completedStepClasses" />
          <span v-else class="hidden h-0 w-10 border-t-2 border-dashed border-gray-300 md:block" />
        </span>
      </div>
    </div>
  </div>
</template>
