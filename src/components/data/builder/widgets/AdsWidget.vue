<script setup lang="ts">
import { Widget } from '#nuxt-store-core/composables/useWidget'

const props = defineProps<{
  id: number
  placement: string
}>()

interface AdsWidget extends Widget {
  data?: {
    id: number
    placement: string
    image: string
    route: string
    title?: string
    description?: string
    cta?: string
  }
}

const widget: any = reactive({ id: props.id, data: undefined } as AdsWidget)
const data = computed(() => widget.data)

onMounted(async () => {
  widget.data = await useTempWidget(props.id, props.placement)
})
</script>

<template>
  <NuxtLink v-if="data" :to="data.route">
    <img :src="data.image" :alt="data.name" class="object-cover" />
  </NuxtLink>
</template>
