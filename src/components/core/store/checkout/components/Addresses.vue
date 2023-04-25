<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'
import usePersistForm from '#nuxt-store-core/composables/usePersistForm'
import IconEdit from '~icons/carbon/edit'
import IconTrash from '~icons/carbon/trash-can'
import IconCheck from '~icons/carbon/checkmark-filled'
import IconAdd from '~icons/carbon/add-filled'

const props = defineProps({
  currentStepKey: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
})
const checkoutStore = useCheckoutStore()
const { addresses, separateBillingAddress } = storeToRefs(checkoutStore)

const form: any = reactive({
  separateBillingAddress: separateBillingAddress.value,
  shippingAddressId: 0,
  billingAddressId: 0,
})

watch([() => form.shippingAddressId, () => form.billingAddressId], () => {
  checkoutStore.markStepAsCompleted(props.currentStepKey)
  usePersistForm({
    repository: 'carts',
    action: 'update',
    method: 'POST',
    data: form,
    exclude: ['separateBillingAddress'],
  })
})

function toggleBillingStep() {
  checkoutStore.toggleBillingAddress()
  if (separateBillingAddress.value) {
    checkoutStore.setCurrentStep(2)
  }
}

const stepTitle = computed(() =>
  props.currentStepKey
    .toLowerCase()
    .replace('_', ' ')
    .replace(/^\w/, (c) => c.toUpperCase()),
)

const modalText = ref<string>('Content of the modal')
const visible = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)
function showModal() {
  visible.value = true
}
function handleOk() {
  modalText.value = 'The modal will be closed after two seconds'
  confirmLoading.value = true
  setTimeout(() => {
    visible.value = false
    confirmLoading.value = false
  }, 2000)
}
</script>

<template>
  <div
    class="text-center"
    :class="checkoutStore.checkoutType === 'express' ? 'flex flex-col items-center justify-between md:flex-row' : ''"
  >
    <h2 class="mb-4 text-base" v-text="stepTitle" />
  </div>
  <div :class="{ 'md:-ml-10 md:flex': addresses.length }">
    <div v-if="addresses.length" class="px-3 md:w-4/5 md:overflow-hidden md:px-10">
      <Swiper
        class="swiper-cards"
        :modules="[SwiperAutoplay, SwiperNavigation, SwiperEffectCards, SwiperPagination]"
        :slides-per-view="1"
        :space-between="40"
        :navigation="true"
        :pagination="false"
        :breakpoints="{
          360: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1536: {
            slidesPerView: 2,
          },
        }"
      >
        <SwiperSlide v-for="address in addresses" :key="address.id">
          <div class="group">
            <section class="shadow-3xl border-base group-hover:border-brand-500 rounded bg-white hover:bg-gray-50">
              <address class="h-40 p-4 text-sm not-italic">
                <h4 class="mb-4 font-medium">Address {{ address.id }}</h4>
                <input
                  :id="`${currentStepKey}_${address.id}`"
                  v-model="form.shippingAddressId"
                  :value="address.id"
                  class="peer hidden"
                  type="radio"
                />
                <label
                  :for="`${currentStepKey}_${address.id}`"
                  class="peer-checked:border-brand-500 absolute inset-0 border-2"
                />
                <IconCheck
                  class="peer-checked:text-brand-500 pointer-events-none absolute right-4 top-8 box-content block h-6 w-6 -translate-y-1/2 rounded-full border-4 border-gray-300 bg-white text-white group-hover:border-gray-400 peer-checked:border-gray-200"
                />
                <div>
                  <span>{{ address.first_name }}</span>
                  <span v-if="address.last_name">&nbsp;{{ address.last_name }}</span>
                </div>
                <div v-text="address.address_line_1" />
                <div v-text="address.address_line_2" />
                <div v-text="address.city" />
                <div v-text="address.state" />
                <div v-text="address.zip_code" />
              </address>
              <footer
                class="border-base flex items-center justify-start gap-4 border-b-0 border-l-0 border-r-0 px-4 py-4 text-sm font-medium text-neutral-600"
              >
                <a href="#" class="flex items-center gap-2 text-neutral-400"> <IconEdit class="h-4 w-4" /> Edit </a>
                <a href="#" class="flex items-center gap-2 text-neutral-400"> <IconTrash class="h-4 w-4" /> Delete </a>
              </footer>
            </section>
          </div>
        </SwiperSlide>
      </Swiper>
      <button
        class="group mt-16 flex h-32 w-full flex-col items-center justify-center border-2 border-gray-200 bg-gray-100 transition-all hover:bg-gray-200 md:hidden"
      >
        <IconAdd class="h-6 w-6 group-hover:animate-bounce" />
        <span class="animate-pulse">Add Address</span>
      </button>
    </div>
    <button
      class="height group block hidden h-[228px] w-full flex-col items-center justify-center border-2 border-gray-200 bg-gray-100 transition-all hover:bg-gray-200 md:flex"
      :class="{ 'md:flex md:w-1/5': addresses.length }"
      @click="showModal"
    >
      <IconAdd class="h-6 w-6 group-hover:animate-bounce" />
      <span class="animate-pulse">Add Address</span>
    </button>
    <a-modal v-model:visible="visible" title="Add address" centered :confirm-loading="confirmLoading" @ok="handleOk">
      <CoreStoreCheckoutElementsAddressForm />
      <template #footer>
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
      </template>
    </a-modal>
  </div>
  <div v-if="currentStepKey === 'shipping_address' && form.shippingAddressId" class="flex">
    <div class="relative mx-auto mt-4 md:mt-10">
      <div class="flex items-center justify-center gap-2">
        <input
          id="use_different_billing_address"
          v-model="form.separateBillingAddress"
          class="peer hidden"
          type="checkbox"
        />
        <label for="use_different_billing_address" class="absolute inset-0 z-50" @click="toggleBillingStep" />
        <IconCheck
          class="pointer-events-none relative top-3 box-content h-5 w-5 -translate-y-1/2 rounded-full border-2 border-gray-300 bg-white text-white"
          :class="{ 'peer-checked:text-brand-500 border-gray-300 text-black': form.separateBillingAddress }"
        />
        <span class="text-sm font-medium">Use an alternative billing address</span>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --swiper-theme-color: #353f4f;
  --swiper-navigation-size: 20px;
  --swiper-navigation-top-offset: 50%;
  --swiper-navigation-sides-offset: -30px;
  --swiper-navigation-color: var(--swiper-theme-color);
  --swiper-pagination-bottom: -40px;
}
.swiper-slide {
  opacity: 0.1;
}
.swiper-slide-active,
.swiper-slide-next,
.swiper-slide-next + div {
  opacity: 1;
}
</style>
