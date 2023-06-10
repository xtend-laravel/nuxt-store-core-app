<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAddressStore } from '#nuxt-store-core/store/address'
import { useCartStore } from '#nuxt-store-core/store/cart'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'
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

const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()
await checkoutStore.fetch()
const { addresses, separateBillingAddress, selectedShippingAddressId, selectedBillingAddressId } =
  storeToRefs(checkoutStore)

const form: any = reactive({
  separateBillingAddress: separateBillingAddress.value,
  shippingAddressId: selectedShippingAddressId.value,
  billingAddressId: selectedBillingAddressId.value,
})

onMounted(() => {
  if (props.currentStepKey == 'shipping_address' && form.shippingAddressId > 0) {
    checkoutStore.markStepAsCompleted(props.currentStepKey)
  } else if (props.currentStepKey == 'billing_address' && form.billingAddressId > 0) {
    checkoutStore.markStepAsCompleted(props.currentStepKey)
  }
})

watch([() => form.shippingAddressId, () => form.billingAddressId], () => {
  checkoutStore.markStepAsCompleted(props.currentStepKey)
  const type = props.currentStepKey === 'shipping_address' ? 'shipping' : 'billing'
  const value = props.currentStepKey === 'shipping_address' ? form.shippingAddressId : form.billingAddressId
  cartStore.setAddress(type, value)
})

function toggleBillingStep() {
  if (form.shippingAddressId === 0 || addresses.value.length === 1) {
    return
  }
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

const addressStore = useAddressStore()
const modalTitle = ref<string>('Title of the modal')
const modalText = ref<string>('Content of the modal')
const loading = ref<boolean>(false)
const visible = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)
function addAddress() {
  addressStore.$reset()
  addressStore.setAction('create')
  modalTitle.value = 'Add address'
  visible.value = true
}
async function handleOk() {
  loading.value = true
  addressStore.action === 'update' ? await updateAddress() : await createAddress()
  modalText.value = 'The modal will be closed after two seconds'
  confirmLoading.value = true
  setTimeout(async () => {
    loading.value = false
    visible.value = false
    confirmLoading.value = false
    addressStore.$reset()
    await checkoutStore.fetch()
  }, 2000)
}

async function updateAddress() {
  await useApi({
    endpoint: `addresses/${addressStore.addressForm.id}`,
    requiresAuth: true,
    action: 'update',
    method: 'PUT',
    data: addressStore.addressForm,
  })
}

async function createAddress() {
  await useApi({
    endpoint: 'addresses',
    requiresAuth: true,
    action: 'create',
    method: 'POST',
    data: addressStore.addressForm,
  })
}

async function editAddress(id: number) {
  const { data } = await useApi({
    endpoint: `addresses/${id}`,
    requiresAuth: true,
    action: 'show',
    method: 'GET',
  })
  if (data.attributes) {
    addressStore.setAction('update')
    addressStore.setAddressForm(data.attributes)
    modalTitle.value = `Edit ${addressStore.addressForm.title || `address ${addressStore.addressForm.id}`}`
  }
  visible.value = true
}

async function deleteAddress(id: number) {
  await useApi({
    endpoint: `addresses/${id}`,
    requiresAuth: true,
    action: 'destroy',
    method: 'DELETE',
  })
  addressStore.$reset()
  await checkoutStore.fetch()
}

function cancel(e: MouseEvent) {
  console.log(e)
}
function handleCancel(e: MouseEvent) {
  console.log(e)
  visible.value = false
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
        id="addressSwiper"
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
              <address class="h-56 p-4 text-sm not-italic">
                <h4 v-if="address.title" class="mb-2 font-semibold" v-text="address.title" />
                <h4 v-else class="mb-4 font-medium" v-text="`Address ${address.id}`" />
                <input
                  v-if="currentStepKey == 'billing_address'"
                  :id="`${currentStepKey}_${address.id}`"
                  v-model="form.billingAddressId"
                  :value="address.id"
                  class="peer hidden"
                  type="radio"
                />
                <input
                  v-else
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
                  <div v-if="address.company_name">{{ address.company_name }}</div>
                </div>
                <div v-if="address.contact_email" v-text="address.contact_email" />
                <div v-if="address.contact_phone" v-text="address.contact_phone" />
                <div v-if="address.line_one" v-text="address.line_one" />
                <div v-if="address.line_two" v-text="address.line_two" />
                <div v-if="address.city" v-text="address.city" />
                <div v-if="address.postcode" v-text="address.postcode" />
                <div v-if="address.country" v-text="address.country" />
                <div v-if="address.state" v-text="address.state" />
              </address>
              <footer
                class="border-base relative z-50 flex items-center justify-start gap-4 border-b-0 border-l-0 border-r-0 px-4 py-2 text-sm font-medium text-neutral-600"
              >
                <button
                  class="flex items-center gap-2 text-neutral-400 hover:text-black"
                  @click="editAddress(address.id)"
                >
                  <IconEdit class="h-4 w-4" /> Edit
                </button>
                <a-popconfirm
                  class="flex cursor-pointer items-center gap-2 text-neutral-400 hover:text-red-800"
                  title="Are you sure you want to delete this address?"
                  ok-text="Yes"
                  cancel-text="No"
                  @confirm="deleteAddress(address.id)"
                  @cancel="cancel"
                >
                  <IconTrash class="h-4 w-4" /> Delete
                </a-popconfirm>
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
      class="height group block hidden h-60 w-full flex-col items-center justify-center border-2 border-gray-200 bg-gray-100 transition-all hover:bg-gray-200 md:flex"
      :class="{ 'md:flex md:w-1/5': addresses.length }"
      @click="addAddress"
    >
      <IconAdd class="h-6 w-6 group-hover:animate-bounce" />
      <span class="animate-pulse">Add Address</span>
    </button>
    <a-modal v-model:visible="visible" :title="modalTitle" centered :confirm-loading="confirmLoading" @ok="handleOk">
      <CoreStoreCheckoutElementsAddressForm />
      <template #footer>
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
      </template>
    </a-modal>
  </div>
  <div v-if="currentStepKey === 'shipping_address'" class="flex">
    <div class="relative mx-auto mt-4 md:mt-10">
      <div
        class="flex items-center justify-center gap-2"
        :class="{ 'opacity-50': !form.shippingAddressId || addresses.length === 1 }"
      >
        <input
          id="use_different_billing_address"
          v-model="form.separateBillingAddress"
          class="peer hidden"
          :disabled="!form.shippingAddressId || addresses.length === 1"
          type="checkbox"
        />
        <label for="use_different_billing_address" class="absolute inset-0 z-50" @click="toggleBillingStep" />
        <IconCheck
          class="pointer-events-none relative top-3 box-content h-5 w-5 -translate-y-1/2 rounded-full border-2 border-gray-300 bg-white text-white"
          :class="{
            'peer-checked:text-brand-500 border-gray-300 text-black':
              form.separateBillingAddress && form.shippingAddressId && addresses.length > 1,
          }"
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
#addressSwiper .swiper-slide {
  opacity: 0.1;
}

#addressSwiper .swiper-slide-active,
#addressSwiper .swiper-slide-next,
#addressSwiper .swiper-slide-next + div {
  opacity: 1;
}
</style>
