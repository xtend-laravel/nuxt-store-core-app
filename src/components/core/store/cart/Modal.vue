<script setup lang="ts">
import type { Ref } from 'vue'

const props = defineProps<{
  infoText?: string
  modalCartVisible: boolean
  item: any
}>()

const emit = defineEmits<{
  (e: 'closeModal'): void
}>()

const item = reactive(props.item)
const images = item?.product.images || []
const thumbnail = images?.thumbnail?.replace('conversions/', '').replace('-medium', '') || ''
const purchasable = computed(() => item?.purchasable)

const { formatPrice } = useFormattedPrice()

// @todo make 100 the default value and use `formatPrice` directly instead?
function getFormattedPrice(price: Ref<number> | number): string {
  return formatPrice(unref(price), 0, 100).value
}

function closeModal() {
  emit('closeModal')
}
</script>

<template>
  <div class="modal" :class="{ 'modal-open': modalCartVisible }">
    <div class="modal-box relative max-w-5xl p-0">
      <div class="bg-brand-400 w-full p-4 text-lg font-semibold text-white">
        <span class="mr-2">&#10003;</span> Product added to your shopping cart
      </div>
      <label for="addToCartModal" class="absolute right-3 top-3 z-50" @click="closeModal">
        <button class="btn btn-sm btn-circle btn-outline text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </label>
      <div class="card lg:card-side bg-base-100 shadow-xl">
        <figure class="h-60 w-full border object-cover object-top">
          <img :src="thumbnail" :alt="item?.product.name" />
        </figure>
        <div class="card-body">
          <div class="flex justify-between gap-6">
            <div class="text-lg font-semibold">
              <span v-text="item?.quantity" />x {{ item?.product.name }}
              <ul class="flex gap-2 text-xs">
                <li v-for="optionValue in purchasable?.values" :key="optionValue.id">
                  <span><CoreStoreMultilingual :value="optionValue.option.name" />: </span>
                  <span><CoreStoreMultilingual :value="optionValue.name" /></span>
                </li>
              </ul>
            </div>
            <span class="text-brand-500 text-lg font-semibold">
              {{ getFormattedPrice(item?.total) }}
            </span>
          </div>
          <CoreStoreCartItemsSummary class="pb-0 pt-4" />
          <div class="text-center">
            <NuxtLink
              to="/"
              class="hover:shadow-5xl inline-flex w-full items-center justify-center rounded-md px-6 py-3 text-lg font-semibold uppercase text-black shadow-2xl transition-all duration-200 ease-in-out focus:text-black focus:text-white focus:shadow"
            >
              <span>Continue Shopping</span>
            </NuxtLink>
          </div>
          <div class="mt-2 text-center">
            <NuxtLink
              to="/checkout"
              class="hover:bg-brand-500 inline-flex w-full items-center justify-center rounded-md bg-black px-3 py-3 text-lg font-semibold uppercase text-white transition-all duration-200 ease-in-out hover:text-white focus:text-white focus:shadow"
            >
              <span><span class="mr-2">&#10003;</span>Continue to Checkout</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
