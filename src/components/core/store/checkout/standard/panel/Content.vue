<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Collapse } from 'vue-collapsed'
import Nav from './Nav.vue'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'

defineProps<{
  step: any
  currentStep: number
}>()
const checkoutStore = useCheckoutStore()
const { currentStep } = storeToRefs(checkoutStore)
</script>

<template>
  <Collapse
    :when="currentStep === step.index"
    class="v-collapse overflow-hidden !px-10 !pb-10 !pt-4 text-sm text-gray-500"
    :class="{ '!h-full': step.key === 'payment_method' && currentStep === 5 }"
  >
    <Component :is="step.component" :key="step.key" :current-step-key="step.key" />
    <slot name="panel-nav">
      <Nav :current-step="currentStep" :step="step" />
    </slot>
  </Collapse>
</template>

<style>
.v-collapse {
  transition: height var(--vc-auto-duration) cubic-bezier(0.33, 1, 0.68, 1);
}
</style>
