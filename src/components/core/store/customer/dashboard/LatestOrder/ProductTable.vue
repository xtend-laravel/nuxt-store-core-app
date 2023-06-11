<script setup lang="ts">
import type { Product } from '#nuxt-store-core/store/customer/dashboard'

const props = defineProps<{
  items: Product[]
  selectedProduct: Product
}>()

const emit = defineEmits<{
  (e: 'update:selectedProduct', value: any): void
}>()

const { formatPrice } = useFormattedPrice()
function getFormattedPrice(price: Ref<number> | number): string {
  return formatPrice(unref(price), 0, 100).value
}

const perPage = 5
const pagesCount = Math.ceil(props.items.length / perPage)
const pages = Array(pagesCount)
  .fill(null)
  .map((_, i) => i + 1)

const currentPage = ref(1)
const offset = computed(() => perPage * (currentPage.value - 1))
const paginatedItems = computed(() => props.items.slice(offset.value, offset.value + perPage))

// Select initial product
onMounted(() => {
  emit('update:selectedProduct', props.items[0])
})

function selectProduct(item: any) {
  emit('update:selectedProduct', item)
}
</script>

<template>
  <div>
    <div class="overflow-x-scroll">
      <table class="table-compact table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Variants</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedItems" :key="item.id" @mouseover="selectProduct(item)">
            <td>
              <div class="py-2" v-text="item.product.name" />
            </td>
            <td>
              <ul class="mb-0 flex items-center gap-2 divide-x">
                <div
                  v-for="(optionValue, index) in item.purchasable.values"
                  :key="optionValue.id"
                  :class="{ 'pl-2': index > 0 }"
                >
                  <span><CoreStoreMultilingual :value="optionValue.option.name" />: </span>
                  <span><CoreStoreMultilingual :value="optionValue.name" /></span>
                </div>
              </ul>
            </td>
            <td>
              <div v-text="item.quantity" />
            </td>
            <td>
              {{ getFormattedPrice(item.product.prices.basePrice) }}
            </td>
            <td>
              {{ getFormattedPrice(item.total) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Only show pagination if there are more than 5 items -->
    <nav
      v-if="items.length > perPage"
      class="flex items-center justify-between border-t border-gray-200 bg-white py-3"
      aria-label="Pagination"
    >
      <div class="hidden sm:block">
        <p class="text-sm text-gray-700">
          Showing
          <!-- space -->
          <span class="font-medium">{{ offset + 1 }}</span>
          <!-- space -->
          to
          <!-- space -->
          <span class="font-medium">{{ offset + perPage }}</span>
          <!-- space -->
          of
          <!-- space -->
          <span class="font-medium">{{ items.length }}</span>
          <!-- space -->
          results
        </p>
      </div>
      <div class="flex flex-1 justify-between sm:justify-end">
        <button
          :disabled="currentPage === 1"
          class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:bg-white disabled:text-gray-500"
          @click="currentPage--"
        >
          Previous
        </button>

        <button
          :disabled="currentPage === pagesCount"
          class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:bg-white disabled:text-gray-500"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </nav>
  </div>
</template>
