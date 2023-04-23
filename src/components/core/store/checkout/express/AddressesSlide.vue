<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useCheckoutStore } from "#nuxt-store-core/store/checkout";
import { computed } from "vue";
import IconEdit from '~icons/carbon/edit'
import IconTrash from '~icons/carbon/trash-can'
import IconCheck from '~icons/carbon/checkmark-filled'

const props = defineProps<{
  currentStepKey: string;
  modelValue: string;
}>()

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const checkoutStore = useCheckoutStore()
const { addresses, separateBillingAddress } = storeToRefs(checkoutStore)

</script>

<template>
  <Swiper
    class="swiper-cards"
    :modules="[SwiperAutoplay, SwiperNavigation, SwiperEffectCards, SwiperPagination]"
    :slides-per-view="1"
    :space-between="30"
    :navigation="true"
    :pagination="true"
    :breakpoints="{
      360: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1536: {
        slidesPerView: 3,
      },
    }"
  >
    <SwiperSlide v-for="address in addresses" :key="address.id">
      <section class="shadow-3xl border-base group rounded bg-gray-50 hover:bg-white">
        <address class="relative h-48 p-4 text-sm not-italic">
          <h4 class="mb-4 font-medium">Address {{ address.id }}</h4>
          <input
            :id="`${currentStepKey}_${address.id}`"
            v-model="value"
            :value="address.id"
            class="peer hidden"
            type="radio"
          />
          <label :for="`${currentStepKey}_${address.id}`" class="absolute inset-0" />
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
    </SwiperSlide>
  </Swiper>
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
