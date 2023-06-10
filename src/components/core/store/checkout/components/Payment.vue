<script setup lang="ts">
import { storeToRefs } from 'pinia'
import IconCheck from '~icons/carbon/checkmark-filled'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'

const checkoutStore = useCheckoutStore()

const paymentMethods = [
  {
    name: 'Payzen',
    value: 'payzen',
    image: '/payzen-cb-payment-v-big.svg',
  },
  {
    name: 'Bank wire',
    value: 'bank_wire',
    image: '/bank-transfer-en.svg',
  },
  {
    name: 'Paypal',
    value: 'paypal',
    image: '/paypal.svg',
  },
  {
    name: 'Paypal-x-times',
    value: 'paypal-x-times',
    image: '/paypal-x-times-en.svg',
  },
]

const { selectedPaymentMethod } = storeToRefs(checkoutStore)
const form: any = reactive({
  paymentGatewayIdentifier: selectedPaymentMethod.value,
})

watch(
  () => form.paymentGatewayIdentifier,
  () => {
    if (form.paymentGatewayIdentifier && checkoutStore.checkoutType === 'express') {
      checkoutStore.markStepAsCompleted('payment_method')
      checkoutStore.setSelectedPaymentMethod(form.paymentGatewayIdentifier)
    }
  },
)
</script>

<template>
  <div>
    <h2 class="mb-4 text-base">Payment method</h2>
    <div
      class="group grid grid-cols-4 items-center items-center items-stretch items-stretch gap-4 gap-4 md:grid-cols-4 md:flex-row"
    >
      <template v-for="paymentMethod in paymentMethods" :key="paymentMethod.name">
        <label
          class="relative flex-1 cursor-pointer items-center justify-center border border-gray-200 px-6 py-8 transition hover:border-gray-400"
        >
          <input
            :id="`paymentMethod_${paymentMethod.value}`"
            v-model="form.paymentGatewayIdentifier"
            type="radio"
            name="payment_method"
            :value="paymentMethod.value"
            class="peer hidden"
          />
          <label
            :for="`paymentMethod_${paymentMethod.value}`"
            class="peer-checked:border-brand-500 absolute inset-0 border-2"
          />
          <IconCheck
            class="peer-checked:text-brand-500 pointer-events-none absolute right-4 top-8 box-content block h-6 w-6 -translate-y-1/2 rounded-full border-4 border-gray-300 bg-white text-white group-hover:border-gray-400 peer-checked:border-gray-200"
          />
          <img :src="paymentMethod.image" alt="paymentMethod.name" class="h-[100px] w-full object-contain" />
        </label>
      </template>
    </div>
  </div>
</template>
