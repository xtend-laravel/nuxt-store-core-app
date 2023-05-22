<script setup lang="ts">
import PanelHeader from './panel/Header.vue'
import PanelContent from './panel/Content.vue'

const props = defineProps<{
  isActive: boolean
  url: string
  title: string
  component: any
}>()

const route = useRoute()

const isActive = computed(() => props.url === route.path)
</script>

<template>
  <div class="shadow sm:rounded-md">
    <div class="my-3 flex-col !space-y-6 rounded-t-xl bg-white">
      <slot name="panel-header">
        <PanelHeader :is-active="isActive" :url="url" :title="title" />
      </slot>

      <slot name="panel-content">
        <PanelContent :is-active="isActive">
          <component :is="component" />
        </PanelContent>
      </slot>
    </div>
  </div>
</template>
