<script setup lang="ts">
import useSplitTesting from '#nuxt-store-core/composables/useSplitTesting'
import { useBuilderStore } from '#nuxt-store-core/store/builder'
import type { Widget } from '#nuxt-store-core/types/widget'

const props = defineProps<{
  widgetSlot: string
  version?: 'A' | 'B'
  params?: any
}>()

const splitTestingOptions = {
  version: props.version,
  params: props.params,
  page: props.widgetSlot.replace('page_', ''),
}
const splitTesting =
  props.widgetSlot.startsWith('page_') && props.version ? useSplitTesting(splitTestingOptions) : undefined

const builderStore = useBuilderStore()
builderStore.setSlot(props.widgetSlot)
if (props.params) {
  builderStore.setParams(props.params)
}

const widgets = await builderStore.fetchWidgets(splitTesting)

function calculateWidgetSize(widget: Widget): string {
  return `md:col-span-${widget.cols} md:row-span-${widget.rows}`
}

function calculateWidgetPosition(widget: Widget): string {
  if (widget.colStart === undefined) {
    return ''
  }
  return `col-start-${widget.colStart} row-start-${widget.rowStart}`
}

const widgetList = computed(() => {
  return widgets.map((widget: any) => ({
    ...widget,
    position: calculateWidgetPosition(widget.attributes),
    size: calculateWidgetSize(widget.attributes),
  }))
})
</script>

<template>
  <div>
    <slot name="widgets-override" :widget-list="widgetList">
      <div class="grid grid-cols-1 md:grid-cols-12 md:gap-x-4 md:gap-y-10">
        <template v-for="widget in widgetList" :key="widget.id">
          <div :class="[widget.position, widget.size]">
            <BuilderWidgetComponent :widget="widget">
              <template #beforeComponent>
                <slot :widget="widget.attributes" name="beforeComponent" />
              </template>
              <!-- Main slot content if any here -->
              <template #afterComponent>
                <slot :widget="widget.attributes" name="afterComponent" />
              </template>
            </BuilderWidgetComponent>
          </div>
        </template>
      </div>
    </slot>
  </div>
</template>
