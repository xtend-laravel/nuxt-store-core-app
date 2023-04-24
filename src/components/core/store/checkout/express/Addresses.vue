<script setup lang="ts">
import { reactive, ref } from 'vue'
import AddressesSlide from '~/components/core/store/checkout/express/AddressesSlide.vue'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'

const checkoutStore = useCheckoutStore()
const shippingCompleted = computed(() => checkoutStore.isStepCompleted('shipping_address'))
const billingCompleted = computed(() => checkoutStore.isStepCompleted('billing_address'))
type AddressType = 'Shipping' | 'Billing'
const addressType = ref<AddressType>('Shipping')

const form = reactive({
  shippingAddressId: null,
  billingAddressId: null,
})

const confirmed = reactive({
  shipping: false,
  billing: false,
})

function confirmAddress(type: AddressType) {
  if (type === 'Shipping') {
    checkoutStore.markStepAsCompleted('shipping_address')

    if (form.billingAddressId === null) {
      form.billingAddressId = form.shippingAddressId
    }

    confirmed.shipping = true
    addressType.value = 'Billing'
  } else {
    checkoutStore.markStepAsCompleted('billing_address')
    confirmed.billing = true
  }

  persistAddressIds()
}

function changeTab(type: AddressType) {
  addressType.value = type
}

watch(
  () => form.shippingAddressId,
  () => {
    confirmed.shipping = false
  },
)
watch(
  () => form.billingAddressId,
  () => {
    confirmed.billing = false
  },
)

const confirmButtonDisabled = computed(() => {
  if (addressType.value === 'Shipping') {
    return confirmed.shipping
  } else {
    return confirmed.billing
  }
})

function persistAddressIds() {
  usePersistForm({
    repository: 'carts',
    action: 'update',
    method: 'POST',
    data: form,
    exclude: ['separateBillingAddress'],
  })
}
</script>

<template>
  <div>
    <!-- tab navigation -->
    <div class="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
      <div class="flex items-center gap-6 font-medium">
        <button type="button" class="flex items-center gap-1 text-gray-300" @click="changeTab('Shipping')">
          <span :class="addressType === 'Shipping' ? '' : 'text-gray-300'">Shipping address</span>
        </button>
      </div>
    </div>

    <!-- shipping tab -->
    <div v-show="addressType === 'Shipping'">
      <AddressesSlide
        key="shipping_address_content"
        v-model="form.shippingAddressId"
        class="flex"
        current-step-key="shipping_address"
        type="express"
      />
    </div>

    <!-- billing tab -->
    <div v-show="addressType === 'Billing'">
      <AddressesSlide
        key="billing_address_content"
        v-model="form.billingAddressId"
        current-step-key="billing_address"
        type="express"
      />
    </div>
  </div>
</template>
