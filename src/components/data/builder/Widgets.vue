<script setup lang="ts">
import useSplitTesting from '#nuxt-store-core/composables/useSplitTesting'
import { useBuilderStore } from '#nuxt-store-core/store/builder'
import { Widget } from '#nuxt-store-core/types/widget'

const props = defineProps<{
  slot: string
  version?: 'A' | 'B'
  params?: Record<string, string>
}>()

const splitTestingOptions = {
  version: props.version,
  params: props.params,
  page: props.slot.replace('page_', ''),
}
const splitTesting = props.slot.startsWith('page_') && props.version ? useSplitTesting(splitTestingOptions) : undefined

const builderStore = useBuilderStore()
builderStore.setSlot(props.slot)
if (props.params) {
  builderStore.setParams(props.params)
}

const widgets = await builderStore.fetchWidgets(splitTesting)

function calculateWidgetSize(widget: Widget): string {
  return `col-span-${widget.cols} row-span-${widget.rows}`
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
  <div class="grid grid-cols-1 md:grid-cols-12 md:gap-x-4 md:gap-y-10">
    <template v-for="widget in widgetList" :key="widget.id">
      <div :class="[widget.position, widget.size]">
        <DataBuilderWidgetComponent :widget="widget.attributes">
          <template #beforeComponent>
            <slot :widget="widget.attributes" name="beforeComponent" />
          </template>
          <!-- Main slot content if any here -->
          <template #afterComponent>
            <slot :widget="widget.attributes" name="afterComponent" />
          </template>
        </DataBuilderWidgetComponent>
      </div>
    </template>
  </div>
</template>
