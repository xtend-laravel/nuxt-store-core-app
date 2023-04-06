<script setup lang="ts">
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Container } from '#components'

const props = defineProps<{
  widget: any
}>()

interface CollectionWidget extends Widget {
  params?: {
    limit?: number
    sort?: string
    order?: string
    collection?: string
    hover_effect?: string
    carousel?: {
      enable?: boolean
      items?: number
    }
  }
  items?: any
}

const data = computed(() => props.widget) as Ref<CollectionWidget>
const items = computed(() => data.value?.items.data)
</script>

<template v-if="data">
  BASE COMPONENT ...
  <Container class="mx-auto">
    <div class="relative">
      <Swiper
        :lazy="true"
        :modules="[Navigation]"
        :slides-per-view="data.params.carousel.items"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
      >
        <SwiperSlide v-for="item in items" :key="item.id">
          <slot name="item" :item="item" />
        </SwiperSlide>
      </Swiper>
      <button type="button" class="swiper-button-prev" />
      <button type="button" class="swiper-button-next" />
    </div>
  </Container>
</template>
