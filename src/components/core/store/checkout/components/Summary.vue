<script setup lang="ts">
import CheckoutActionIcon from '../../cart/items/CheckoutActionIcon.vue'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'

const checkoutStore = useCheckoutStore()
const notes = ref('')
const giftWrap = ref(false)
const giftMessage = ref('')

async function submit() {
  checkoutStore.confirmPayment().then((data: any) => {
    // eslint-disable-next-line no-console
    console.log('createOrder', data)
    checkoutStore.createOrder()
  })
}
</script>

<template>
  <section class="border-base relative rounded shadow-lg">
    <h4 class="mb-4 px-4 pt-4 font-medium underline">Order summary</h4>
    <slot name="summary-header"> </slot>
    <CoreStoreCartItems>
      <template #override-items-list="{ items }">
        <div class="px-4" :class="{ 'scrollbar h-[500px] overflow-y-scroll': Object.keys(items).length > 3 }">
          <CoreStoreCartItemsList :items="items" />
        </div>
      </template>
      <template #override-footer-actions>
        <div>
          <label class="text-brand-500 mb-3 block text-sm">Apply promo code:</label>
          <div class="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              type="text"
              placeholder="Enter your promo code here .."
              class="focus:ring-shadow-none border-brand-500 focus:border-brand-500 relative h-10 w-px flex-1 flex-auto flex-shrink flex-grow rounded-l-md border px-3 text-xs leading-normal focus:outline-none focus:ring-0"
            />
            <div class="-mr-px flex">
              <!-- Apply discount -->
              <button
                type="button"
                class="focus:shadow-outline-brand bg-brand-500 hover:bg-brand-600 focus:border-brand-700 active:bg-brand-700 flex items-center justify-center rounded-r-md border border-transparent px-4 text-xs font-medium leading-6 text-white transition duration-150 ease-in-out focus:outline-none"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        <a-form-item name="switch" label="Notes about your order" :label-col="{ span: 24, offset: 0 }">
          <a-textarea v-model:value="notes" placeholder="Order notes" :rows="4" show-count :maxlength="200" />
        </a-form-item>
        <div class="mt-6">
          <a-checkbox v-model:checked="giftWrap">I would like my order to be gift wrapped</a-checkbox>
        </div>
        <div class="mt-2">
          <a-textarea
            v-if="giftWrap"
            v-model:value="giftMessage"
            :rows="2"
            :maxlength="100"
            placeholder="Enter your message"
          />
        </div>
        <div class="mt-10 w-full text-center">
          <button
            id="checkout-action"
            type="button"
            :disabled="!checkoutStore.stepsValidated"
            class="focus:shadow-outline-brand focus:border-brand-700 active:bg-brand-700 hover:bg-brand-600 bg-brand-500 x-6 inline-flex w-full items-center justify-center rounded-md py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out hover:bg-gray-800 hover:text-white focus:shadow"
            :class="{ 'cursor-not-allowed opacity-50': !checkoutStore.stepsValidated }"
            @click="submit"
          >
            <span>Place order</span>
            <Component :is="CheckoutActionIcon" class="ml-4 h-6 w-6 transition-all group-hover:ml-8" />
          </button>
        </div>
      </template>
    </CoreStoreCartItems>
  </section>
</template>

<style>
.ant-form-item {
  margin-bottom: 2px;
}
</style>
