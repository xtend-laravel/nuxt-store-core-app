<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCheckoutStore } from '~/store/checkout'
import IconUser from '~icons/carbon/user-admin'
import IconBookmark from '~icons/carbon/bookmark'
import IconTruck from '~icons/carbon/delivery-truck'
import IconCreditCard from '~icons/feather/credit-card'

const { step } = defineProps<{
  step: any
  currentStep: number
}>()
const checkoutStore = useCheckoutStore()
const { steps, currentStep } = storeToRefs(checkoutStore)
const icons = {
  connection: IconUser,
  shipping_address: IconBookmark,
  billing_address: IconBookmark,
  shipping_method: IconTruck,
  payment_method: IconCreditCard,
}
const iconsClasses = computed(() => {
  return step.completed ? 'text-white bg-brand-500' : 'text-gray-400 bg-gray-100'
})
</script>

<template>
  <div class="item-center flex w-full">
    <!-- step indicator -->
    <div class="w-12 shrink-0 grow-0 md:w-20 lg:w-28">
      <div class="relative flex h-full w-full items-center justify-center">
        <!-- line -->
        <div
          v-if="step.key !== 'payment_method'"
          class="absolute top-0 h-full w-px border-l border-dashed border-gray-200 bg-transparent"
        />

        <!-- icons -->
        <button
          type="button"
          :class="`absolute top-0 flex flex-col items-center justify-center rounded-full border p-3 ${iconsClasses}`"
        >
          <component :is="icons[step.key] ?? null" class="h-6 w-6" />
        </button>
      </div>
    </div>
    <!-- content -->
    <div class="w-full grow overflow-x-auto px-4 pb-12 lg:px-8 2xl:px-12">
      <component :is="step.component" :key="step.key" :current-step-key="step.key" />
    </div>
  </div>
</template>
