<script setup lang="ts">
import { useFilterStore } from '#nuxt-store-core/store/filters'

const props = defineProps<{
  brands: any
}>()
const filterStore = useFilterStore()
interface BrandNode {
  key: number
  disabled: boolean
  disableCheckbox: boolean
  selectable: boolean
  title: string
  children: BrandNode[]
}
const brands = ref([])
brands.value = props.brands
  .map(
    (child: any): BrandNode => ({
      key: child.id,
      title: `${child.name} (${child.count})`,
      disabled: false,
      disableCheckbox: false,
      selectable: false,
      children: [],
    }),
  )
  .sort((a: BrandNode, b: BrandNode) => a.title.localeCompare(b.title))

function onTrackedChecked(checkedKeys: number[]) {
  filterStore.setBrandIds(checkedKeys)
  filterStore.apply({
    onScroll: false,
  })
}
</script>

<template>
  <div class="h-96 overflow-auto">
    <CheckboxTree :nodes="brands" :searchable="true" @tracked-checked="onTrackedChecked" />
  </div>
</template>
