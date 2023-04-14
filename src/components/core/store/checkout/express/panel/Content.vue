<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useCheckoutStore } from "~/store/checkout";

const {step} = defineProps<{
  step: any
  currentStep: number
}>()
const checkoutStore = useCheckoutStore()
const { steps, currentStep } = storeToRefs(checkoutStore)
</script>

<template>
  <div>
    <Component :is="step.component" :key="step.key" :current-step-key="step.key" />
  </div>
</template>
