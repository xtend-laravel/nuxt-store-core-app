<script setup lang="ts">
import Slider from '@vueform/slider'
import { useFilterStore } from '#nuxt-store-core/store/filters'

const props = defineProps<{
  range: Range
}>()

const filterStore = useFilterStore()

interface Range {
  min: number
  max: number
}

const format = ref({
  prefix: '&euro;',
  decimals: 2,
})

const rangeMin = ref(props.range.min / 100)
const rangeMax = ref(props.range.max / 100)
const rangeValue = ref([props.range.min / 100, props.range.max / 100])

watch(
  () => rangeValue.value,
  (value) => {
    console.log('rangeValue.value', value)
    filterStore.setPriceRange([value[0] * 100, value[1] * 100])
    filterStore.apply({
      onScroll: false,
    })
  },
  { deep: true },
)
</script>

<template>
  <div class="mx-4 my-12">
    <Slider v-model="rangeValue" :min="rangeMin" :max="rangeMax" :format="format" />
  </div>
</template>

<style>
.slider-target {
  @apply relative box-border select-none touch-none tap-highlight-transparent touch-callout-none slider-disabled:cursor-not-allowed;
}
.slider-horizontal {
  @apply h-1.5;
}
.slider-vertical {
  @apply h-80 w-1.5;
}
.slider-txt-dir-rtl {
  @apply slider-txt-rtl;
}
.slider-base {
  @apply relative z-1 h-full w-full rounded bg-gray-300;
}
.slider-connects {
  @apply relative z-0 h-full w-full overflow-hidden rounded;
}
.slider-connect {
  @apply absolute right-0 top-0 z-1 h-full w-full cursor-pointer bg-blue-500 transform-origin-0 transform-style-flat tap:transition-transform tap:duration-300 slider-disabled:cursor-not-allowed slider-disabled:bg-gray-400;
}
.slider-origin {
  @apply absolute right-0 top-0 z-1 h-full w-full transform-origin-0 transform-style-flat h:h-0 v:-top-full v:w-0 txt-rtl-h:left-0 txt-rtl-h:right-auto tap:transition-transform tap:duration-300;
}
.slider-handle {
  @apply absolute rounded-full border-0 bg-white shadow-slider cursor-grab focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-30 h:-right-2 h:-top-1.5 h:h-4 h:w-4 v:-right-1.25 v:-top-2 v:h-4 v:w-4 txt-rtl-h:-left-2 txt-rtl-h:right-auto slider-disabled:cursor-not-allowed;
}
.slider-touch-area {
  @apply h-full w-full;
}
.slider-tooltip {
  @apply absolute block min-w-5 transform whitespace-nowrap rounded border border-blue-400 bg-blue-500 px-1.5 py-1 text-center text-xs font-medium text-white h:left-1/2 h:-translate-x-1/2 v:top-1/2 v:-translate-y-1/2 merge-h:left-auto merge-h:translate-x-1/2 merge-v:top-auto merge-v:-translate-x-4 slider-disabled:border-gray-400 slider-disabled:bg-gray-400 tt-focus:hidden tt-focused:block tt-drag:hidden tt-dragging:block;
}
.slider-tooltip-top {
  @apply bottom-6 h:arrow-bottom merge-h:bottom-3.5;
}
.slider-tooltip-bottom {
  @apply top-6 h:arrow-top merge-h:top-5;
}
.slider-tooltip-left {
  @apply right-6 v:arrow-right merge-v:right-1;
}
.slider-tooltip-right {
  @apply left-6 v:arrow-left merge-v:left-7;
}
.slider-active {
  @apply shadow-slider-active cursor-grabbing;
}
.slider-draggable {
  @apply cursor-ew-resize v:cursor-ns-resize;
}
</style>
