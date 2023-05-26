<script setup lang="ts">
import PanelHeader from './panel/Header.vue'
import PanelContent from './panel/Content.vue'

const props = withDefaults(
  defineProps<{
    activePanel: string
    url: string
    title: string
    component: any
    wrapperClasses?: string
    headerWrapperClasses?: string
    headerActiveWrapperClasses?: string
    headerInactiveWrapperClasses?: string
    headerContentClasses?: string
    headerTitleClasses?: string
    headerActiveTitleClasses?: string
    headerInactiveTitleClasses?: string
  }>(),
  {
    wrapperClasses: 'my-3 flex-col !space-y-6 rounded-t-xl bg-white shadow sm:rounded-md',
  },
)

const emit = defineEmits<{
  (e: 'select'): void
}>()

const isActive = computed(() => props.activePanel === props.url)
</script>

<template>
  <div :class="wrapperClasses">
    <slot name="panel-header">
      <PanelHeader
        :is-active="isActive"
        :url="url"
        :title="title"
        :wrapper-classes="headerWrapperClasses"
        :active-wrapper-classes="headerActiveWrapperClasses"
        :inactive-wrapper-classes="headerInactiveWrapperClasses"
        :content-classes="headerContentClasses"
        :title-classes="headerTitleClasses"
        :active-title-classes="headerActiveTitleClasses"
        :inactive-title-classes="headerInactiveTitleClasses"
        @select="emit('select')"
      />
    </slot>

    <slot name="panel-content">
      <PanelContent :is-active="isActive">
        <component :is="component" />
      </PanelContent>
    </slot>
  </div>
</template>
