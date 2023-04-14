<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useCheckoutStore } from "~/store/checkout";
import IconUser from '~icons/carbon/user-admin'
import IconBookmark from '~icons/carbon/bookmark'
import IconTruck from '~icons/carbon/delivery-truck'
import IconCreditCard from '~icons/feather/credit-card'

const {step} = defineProps<{
  step: any
  currentStep: number
}>()
const checkoutStore = useCheckoutStore()
const { steps, currentStep } = storeToRefs(checkoutStore)
const icons = {
  'connection': IconUser,
  'shipping_address': IconBookmark,
  'billing_address': IconBookmark,
  'shipping_method': IconTruck,
  'payment_method': IconCreditCard,
}
const iconsClasses = computed(() => {
  return step.completed ? 'text-white bg-brand-500' : 'text-gray-400 bg-gray-100'
})
</script>

<template>
  <div class="w-full flex item-center">
    <!-- step indicator -->
    <div class="w-28 shrink-0 grow-0">
      <div class="relative w-full h-full flex items-center justify-center">
        <!-- line -->
        <div v-if="step.key !== 'payment_method'" class="absolute top-0 h-full w-px bg-transparent border-gray-200 border-l border-dashed" />

        <!-- icons -->
        <button type="button" :class="`absolute top-0 border rounded-full p-3 flex items-center justify-center flex-col ${iconsClasses}`">
          <component class="w-6 h-6" :is="icons[step.key] ?? null" />
<!--          {{ step.key }}-->
<!--          {{ step.completed }}-->
        </button>
      </div>
    </div>
    <!-- content -->
    <div class="grow pb-16 px-12 w-full overflow-x-auto">
      <component :is="step.component" :key="step.key" :current-step-key="step.key" />
    </div>
  </div>
</template>
