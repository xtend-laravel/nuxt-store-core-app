<script setup lang="ts">
import Multilingual from "~/components/core/store/Multilingual.vue";
import { Popconfirm } from "ant-design-vue"
import { useCartStore } from "~/store/cart";

const props = defineProps<{
  item: Record<string, any>
}>();

const cartStore = useCartStore();

const { formatPrice } = useFormattedPrice("EUR");

const purchasable = computed(() => props.item.purchasable);

function getFormattedPrice(price: Ref<number> | number): string {
  const priceValue = isRef(price) ? price.value : price;
  return formatPrice(priceValue, 0, 1000).value;
}

async function removeLine(item: any) {
  await cartStore.removeLine(item.id)
}
</script>

<template>
  <div class="relative shrink-0">
    <span
      class="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-right-2 sm:-top-2"
      v-text="item.quantity"
    />
    <img
      v-if="item.product"
      class="h-24 w-24 max-w-full rounded-lg object-cover"
      :src="item.product.images.thumbnail"
      :alt="item.product.name"
    />
  </div>

  <div class="relative flex flex-1 flex-col justify-between">
    <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
      <div class="pr-8 sm:pr-5">
        <p class="text-base font-semibold text-gray-900" v-text="item.product.name" />
        <div>
          <!-- variant options -->
          <ul class="flex gap-2 text-xs">
            <li v-for="optionValue in purchasable.values" :key="optionValue.id">
              <span><Multilingual :value="optionValue.option.name" />: </span>
              <span><Multilingual :value="optionValue.name" /></span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
        <p class="w-20 shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
          {{ getFormattedPrice(item.total) }}
        </p>
      </div>
    </div>

    <!-- remove cart line button -->
    <div class="absolute right-0 top-0 flex sm:bottom-0 sm:top-auto">
      <Popconfirm
        placement="topRight"
        title="Delete this product?"
        @confirm.stop="removeLine(item)"
        description="Are you sure want to delete this product?"
      >
        <button
          type="button"
          class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out hover:text-gray-900 focus:shadow"
        >
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class="" />
          </svg>
        </button>
      </Popconfirm>
    </div>
  </div>
</template>
