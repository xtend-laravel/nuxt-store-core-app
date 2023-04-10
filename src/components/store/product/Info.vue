<script setup lang="ts">
import { storeToRefs } from 'pinia'
import IconMinus from '~icons/carbon/subtract'
import IconAdd from '~icons/carbon/add'
import IconHelp from '~icons/carbon/help'
import IconShoppingCart from '~icons/carbon/shopping-cart'
import IconHeart from '~icons/feather/heart'
import IconFacebook from '~icons/carbon/logo-facebook'
import IconTwitter from '~icons/carbon/logo-twitter'
import IconPinterest from '~icons/carbon/logo-pinterest'
import { useExtendedProductStore } from '~/store/product'

const { currentProduct } = storeToRefs(useExtendedProductStore())
const name = computed(() => currentProduct.value.attributes.name)
const brandName = computed(() => currentProduct.value.attributes.legacy_data.manufacturer_name)
const description = computed(() =>
  currentProduct.value.attributes.description
    ? currentProduct.value.attributes.description.replace(/<[^>]*>/g, '')
    : '',
)

const { formatPrice } = useFormattedPrice('EUR')
const price = ref(currentProduct.value.attributes.prices.basePrice)
const formattedPrice = computed(() => formatPrice(price, 0, 1000).value)
</script>

<template>
  <div>
    <!-- brand -->
    <h3 class="text-xl font-bold uppercase" v-text="brandName" />
    <!-- title -->
    <h1 class="font-heading mt-2 text-lg font-medium md:text-2xl" v-text="name" />
    <!-- SKU -->
    <div class="mt-3 flex items-center gap-5 text-sm">
      <div><label class="font-medium">Reference</label> <span class="text-brand-500">5004913020440</span></div>
      <label class="font-medium">Instock</label>
      <a href="#" class="border border-neutral-200 p-1">Plus d'infos</a>
    </div>
    <!-- price -->
    <div class="mt-6">
      <span class="text-3xl font-semibold" v-text="formattedPrice" />
      <span class="text-xs text-neutral-400">Tax Included</span>
    </div>
    <!-- actions -->
    <form class="mt-10 flex flex-col gap-8 border border-neutral-200 p-5 text-xs md:gap-12 md:text-sm">
      <!-- Size -->
      <Option :options="['36', '36 1/2', '37 1/2', '38', '38 1/2']" selected="2" name="size" label="Size">
        <template #after>
          <div class="ml-5">
            <button
              type="button"
              class="text-xxs flex items-center gap-1 rounded-full border border-neutral-200 px-3 py-0.5 uppercase"
            >
              <IconHelp class="inline h-2 w-2" />
              Size chart
            </button>
          </div>
        </template>
      </Option>
      <!-- Color -->
      <Option :options="['Red', 'Blue', 'Green']" name="color" label="Color" />
      <div class="mt-2 flex w-full flex-col items-center gap-2 lg:gap-6 xl:flex-row">
        <!-- Quantity -->
        <div class="flex w-full items-center">
          <button
            type="button"
            class="z-20 flex h-10 w-8 items-center justify-center border border-r-0 border-neutral-200"
          >
            <IconMinus class="h-2 w-2" />
          </button>
          <input
            type="number"
            class="3xl:w-28 focus:border-brand-600 focus:ring-brand-600 z-10 inline-flex h-10 w-full border border-neutral-200 px-2 py-2 text-center text-xs xl:w-24"
            style="appearance: textfield"
            value="1"
            inputmode="numeric"
          />
          <button
            type="button"
            class="z-20 flex h-10 w-8 items-center justify-center border border-l-0 border-neutral-200"
          >
            <IconAdd class="h-2 w-2" />
          </button>
        </div>
        <!-- add to cart button -->
        <button
          type="button"
          class="hover:bg-brand-500 flex w-full items-center justify-center gap-1 bg-black px-7 py-3 text-xs font-semibold uppercase text-white transition-colors"
        >
          <IconShoppingCart class="h-3 w-3" />
          Add to cart
        </button>
        <button
          type="button"
          class="border-px hover:bg-brand-500 flex h-[40px] w-full items-center justify-center gap-1 border border-black px-7 py-3 text-xs font-semibold uppercase text-black transition-colors hover:border-transparent hover:text-white"
        >
          Add to wishlist
          <IconHeart />
        </button>
      </div>
    </form>
    <!-- extra shipping information -->
    <div class="mt-4 flex items-center justify-evenly border border-neutral-200 py-3 text-sm font-bold uppercase">
      <div class="flex items-center gap-1">
        <IconTruck class="inline-block h-4 w-4" />
        <p>Livraison <span class="text-red-500">Gratuite</span></p>
      </div>
      <div class="flex items-center gap-1">
        <IconBag class="inline-block h-4 w-4" />
        <p>Retour <span class="text-red-500">GRATUIT</span></p>
      </div>
    </div>
    <!-- tabs -->
    <div class="mt-5">
      <InfoTabs />
    </div>
    <!-- socials sharing -->
    <div class="mt-5">
      <button
        type="button"
        class="hover:border-brand-400 hover:text-brand-500 flex w-full items-center justify-center gap-2 rounded border border-neutral-200 bg-white py-2 text-sm font-medium uppercase tracking-wider transition-colors hover:bg-neutral-50/10"
      >
        <CarbonUserAvatar class="h-4 w-4 text-black" />
        send to a friend
      </button>
      <!-- share buttons -->
      <div class="mt-3 flex items-center justify-center gap-5">
        <a
          href="#"
          class="group flex items-center gap-1 rounded px-3 py-1.5 text-xs tracking-wide hover:bg-[#3b5998] hover:text-white"
        >
          <IconFacebook class="h-3 w-3 text-[#3b5998] group-hover:text-white" />
          Share
        </a>
        <a
          href="#"
          class="group flex items-center gap-1 rounded px-3 py-1.5 text-xs tracking-wide hover:bg-[#55acee] hover:text-white"
        >
          <IconTwitter class="h-3 w-3 text-[#55acee] group-hover:text-white" />
          Share
        </a>
        <a
          href="#"
          class="group flex items-center gap-1 rounded px-3 py-1.5 text-xs tracking-wide hover:bg-[#cb2027] hover:text-white"
        >
          <IconPinterest class="h-3 w-3 text-[#cb2027] group-hover:text-white" />
          Share
        </a>
      </div>
    </div>
  </div>
</template>
