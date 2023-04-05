<script setup lang="ts">
import { storeToRefs } from 'pinia'
import PanelHeader from './panel/Header.vue'
import PanelContent from './panel/Content.vue'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'

const checkoutStore = useCheckoutStore()
const { steps, currentStep } = storeToRefs(checkoutStore)
function handleAccordion(step: any): void {
  const lessThanCurrentStep: boolean = step.index < currentStep.value
  const connectedNextStep: boolean = currentStep.value === 0 && step.index === 1
  if (checkoutStore.isAuthenticated && (step.completed || lessThanCurrentStep || connectedNextStep)) {
    checkoutStore.setCurrentStep(step.index)
  }
}
</script>

<template>
  <div class="p-4">
    <template v-for="step in steps" :key="step.index">
      <div v-if="!step.hidden" class="shadow sm:rounded-md">
        <div class="my-3 flex-col !space-y-6 rounded-t-xl bg-white">
          <slot name="panel-header" :step="step" :current-step="currentStep" :handle-accordion="handleAccordion">
            <PanelHeader :step="step" :current-step="currentStep" @accordion="handleAccordion" />
          </slot>
          <slot name="panel-content" :step="step" :current-step="currentStep">
            <PanelContent :step="step" :current-step="currentStep" />
          </slot>
        </div>
      </div>
    </template>
  </div>
</template>
