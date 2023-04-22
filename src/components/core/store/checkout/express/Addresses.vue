<script setup lang="ts">
import Addresses from "../components/Addresses.vue";
import { useCheckoutStore } from "#nuxt-store-core/store/checkout";
import IconCheck from "~icons/carbon/checkmark-filled";
import IconLocation from "~icons/carbon/location-filled";
import { ref } from "vue";

const checkoutStore = useCheckoutStore();
const shippingCompleted = computed(() => checkoutStore.isStepCompleted("shipping_address"));
const billingCompleted = computed(() => checkoutStore.isStepCompleted("billing_address"));
type AddressType = "Shipping" | "Billing"
const addressType: AddressType = "Shipping";
const currentTab = ref<AddressType>("Shipping");

function confirmAddress(type: AddressType) {
  if (type === "Shipping") {
    checkoutStore.markStepAsCompleted("shipping_address");
  } else {
    checkoutStore.markStepAsCompleted("billing_address");
  }
}

function changeTab(type: AddressType) {
  currentTab.value = type;
  console.log("current tab is", currentTab.value);
}
</script>

<template>
  <div>
    <div class="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
      <div class="flex items-center gap-6 font-medium">
        <button
          type="button"
          class="flex items-center gap-1 text-gray-300"
          @click="changeTab('Shipping')"
        >
          <IconCheck class="h-4 w-4" :class="{ 'text-brand-500': shippingCompleted }" />
          <span :class="currentTab === 'Shipping' ? 'text-brand-500' : 'text-gray-300'">Shipping address</span>
        </button>
        <button
          type="button"
          class="flex items-center gap-1 text-gray-300"
          @click="changeTab('Billing')"
        >
          <IconCheck class="h-4 w-4" :class="{ 'text-brand-500': billingCompleted }" />
          <span :class="currentTab === 'Billing' ? 'text-brand-500' : 'text-gray-300'">Billing address</span>
        </button>
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          @click="confirmAddress(addressType)"
          class="focus:shadow-outline-brand focus:border-brand-700 active:bg-brand-700 hover:bg-brand-600 bg-brand-500 flex items-center justify-center rounded border border-transparent px-4 text-xs font-medium leading-6 text-white transition duration-150 ease-in-out focus:outline-none"
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

      <Addresses class="flex" current-step-key="shipping_address" type="express" key="shipping_address_content" />

      <Addresses v-show="currentTab === 'Billing'" current-step-key="billing_address" type="express" key="billing_address_content" />
  </div>
</template>
