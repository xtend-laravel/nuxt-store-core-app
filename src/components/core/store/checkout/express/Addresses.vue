<script setup lang="ts">
import AddressesSlide from "~/components/core/store/checkout/express/AddressesSlide.vue";
import { useCheckoutStore } from "#nuxt-store-core/store/checkout";
import IconCheck from "~icons/carbon/checkmark-filled";
import IconLocation from "~icons/carbon/location-filled";
import { ref, reactive } from "vue";

const checkoutStore = useCheckoutStore();
const shippingCompleted = computed(() => checkoutStore.isStepCompleted("shipping_address"));
const billingCompleted = computed(() => checkoutStore.isStepCompleted("billing_address"));
type AddressType = "Shipping" | "Billing";
const addressType = ref<AddressType>("Shipping");

const form = reactive({
  shippingAddressId: null,
  billingAddressId: null,
});

const confirmed = reactive ({
  shipping: false,
  billing: false,
});

function confirmAddress(type: AddressType) {
  if (type === "Shipping") {
    checkoutStore.markStepAsCompleted("shipping_address");

    if (form.billingAddressId === null) {
      form.billingAddressId = form.shippingAddressId;
    }

    confirmed.shipping = true;
    addressType.value = 'Billing';
  } else {
    checkoutStore.markStepAsCompleted("billing_address")
    confirmed.billing = true;
  }

  persistAddressIds()
}

function changeTab(type: AddressType) {
  addressType.value = type;
}

watch(() => form.shippingAddressId, () => {
  confirmed.shipping = false;
})
watch(() => form.billingAddressId, () => {
  confirmed.billing = false;
})


const confirmButtonDisabled = computed(() => {
  if (addressType.value === "Shipping") {
    return confirmed.shipping
  } else {
    return confirmed.billing
  }
});

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
        <button
          type="button"
          class="flex items-center gap-1 text-gray-300"
          @click="changeTab('Shipping')"
        >
          <IconCheck class="h-6 w-6" :class="{ 'text-brand-500': shippingCompleted }" />
          <span :class="addressType === 'Shipping' ? 'text-brand-500' : 'text-gray-300'">Shipping address</span>
        </button>
        <button
          type="button"
          class="flex items-center gap-1 text-gray-300"
          @click="changeTab('Billing')"
        >
          <IconCheck class="h-6 w-6" :class="{ 'text-brand-500': billingCompleted }" />
          <span :class="addressType === 'Billing' ? 'text-brand-500' : 'text-gray-300'">Billing address</span>
        </button>
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          @click="confirmAddress(addressType)"
          :disabled="confirmButtonDisabled"
          class="focus:shadow-outline-brand focus:border-brand-700 active:bg-brand-700 hover:bg-brand-600 bg-brand-500 flex items-center justify-center rounded border border-transparent px-4 text-xs font-medium leading-6 text-white transition duration-150 ease-in-out focus:outline-none
disabled:bg-gray-200"
        >
          Confirm {{ addressType }} Address
        </button>
        <button
          type="button"
          class="focus:shadow-outline-brand focus:border-brand-700 active:bg-brand-700 flex items-center justify-center rounded border border-transparent bg-black/70 px-4 text-xs font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-black focus:outline-none"
        >
          <IconLocation class="mr-1 h-4 w-4" />
          Add Address
        </button>
      </div>
    </div>

    <!-- shipping tab -->
    <div v-show="addressType === 'Shipping'">
      <AddressesSlide class="flex" v-model="form.shippingAddressId" current-step-key="shipping_address" type="express" key="shipping_address_content" />
    </div>

    <!-- billing tab -->
    <div v-show="addressType === 'Billing'">
      <AddressesSlide v-model="form.billingAddressId" current-step-key="billing_address" type="express" key="billing_address_content" />
    </div>
  </div>
</template>
