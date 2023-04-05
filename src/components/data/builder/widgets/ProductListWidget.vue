<script setup lang="ts">
import { Widget } from '#nuxt-store-core/composables/useWidget'
import useTempWidget from '@/composables/useTempWidget'

const props = defineProps<{
  id: number
  type: string
  component: string
  placement: string
}>()

interface ProductListWidget extends Widget {
  data?: {
    id: number
    component: string
  }
}

const widget: any = reactive({
  id: props.id,
  data: undefined,
} as ProductListWidget)
const data = computed(() => widget.data)

onMounted(async () => {
  widget.data = await useTempWidget(props.id, props.placement)
})
</script>

<template>
  <component :is="data.component" v-if="data">
    <template #default>
      <pre>{{ data }}</pre>
    </template>
  </component>
</template>
