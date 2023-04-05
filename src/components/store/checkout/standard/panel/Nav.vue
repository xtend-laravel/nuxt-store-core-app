<script setup lang="ts">
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'

const props = withDefaults(
  defineProps<{
    step: any
    currentStep: number
    previousButton?: any
    nextButton?: any
  }>(),
  {
    previousButton: {
      label: 'Previous',
      classes: 'cursor-pointer text-gray-400 underline hover:text-gray-600',
    },
    nextButton: {
      label: 'Next',
      classes: 'cursor-pointer text-gray-400 underline hover:text-gray-600',
    },
  },
)
const checkoutStore = useCheckoutStore()
</script>

<template>
  <div class="flex items-center justify-between text-xs">
    <button
      v-if="step.index > 0"
      :class="previousButton.classes"
      @click="checkoutStore.setCurrentStep(step.index - 1)"
      v-text="previousButton.label"
    />
    <button
      v-if="step.index > 0"
      :class="{ 'cursor-not-allowed opacity-40': !step.completed, [nextButton.classes]: true }"
      @click="checkoutStore.setCurrentStep(step.index + 1)"
      v-text="nextButton.label"
    />
  </div>
</template>
