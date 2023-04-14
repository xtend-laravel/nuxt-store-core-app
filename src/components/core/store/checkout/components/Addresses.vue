<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'
import usePersistForm from '#nuxt-store-core/composables/usePersistForm'
import IconEdit from '~icons/carbon/edit'
import IconTrash from '~icons/carbon/trash-can'
import IconCheck from '~icons/carbon/checkmark-filled'

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
  usePersistForm({
    repository: 'carts',
    action: 'update',
    method: 'POST',
    data: form,
    exclude: ['separateBillingAddress'],
  })

  if (form.shippingAddressId && checkoutStore.checkoutType === 'express') {
    checkoutStore.markStepAsCompleted('shipping_address')
  }
})

function toggleBillingStep() {
  checkoutStore.toggleBillingAddress()
  if (separateBillingAddress.value) {
    checkoutStore.setCurrentStep(2)
  }
}
</script>

<template>
  <Swiper
    class="swiper-cards"
    :modules="[SwiperAutoplay, SwiperNavigation, SwiperEffectCards, SwiperPagination]"
    :slides-per-view="3"
    :space-between="30"
    :navigation="true"
    :pagination="true"
  >
    <SwiperSlide v-for="address in addresses" :key="address.id">
      <section class="shadow-3xl border-base group rounded bg-gray-50 hover:bg-white">
        <address class="relative h-48 p-4 text-sm not-italic">
          <h4 class="mb-4 font-medium">Address {{ address.id }}</h4>
          <input
            :id="`address_${address.id}`"
            v-model="form.shippingAddressId"
            :value="address.id"
            class="peer hidden"
            type="radio"
          />
          <label :for="`address_${address.id}`" class="absolute inset-0" />
          <IconCheck
            class="pointer-events-none absolute right-4 top-8 box-content block h-6 w-6 -translate-y-1/2 rounded-full border-4 border-gray-300 bg-white text-white group-hover:border-gray-400 peer-checked:border-gray-300 peer-checked:text-black"
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
          <a href="#" class="flex items-center gap-2"> <IconEdit class="h-4 w-4" /> Edit </a>
          <a href="#" class="flex items-center gap-2"> <IconTrash class="h-4 w-4" /> Delete </a>
        </footer>
      </section>
    </SwiperSlide>
  </Swiper>
  <div class="flex">
    <div class="relative mx-auto mt-20 text-center">
      <div v-if="currentStepKey === 'shipping_address'" class="flex items-center justify-center gap-2">
        <input
          id="use_different_billing_address"
          v-model="form.separateBillingAddress"
          class="peer hidden"
          type="checkbox"
        />
        <label for="use_different_billing_address" class="absolute inset-0 z-50" @click="toggleBillingStep" />
        <IconCheck
          class="pointer-events-none relative top-3 box-content h-5 w-5 -translate-y-1/2 rounded-full border-2 border-gray-300 bg-white text-white"
          :class="{ 'border-gray-300 text-black': form.separateBillingAddress }"
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
