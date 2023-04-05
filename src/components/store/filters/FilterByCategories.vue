<script setup lang="ts">
import { useFilterStore } from '#nuxt-store-core/store/filters'

const props = defineProps<{
  categories: Category
}>()
const filterStore = useFilterStore()
interface Category {
  id: number
  name: { [key: string]: string }
  count: number
  children: Category[]
}

interface CategoryNode {
  key: number
  title: string
  disabled: boolean
  disableCheckbox: boolean
  selectable: boolean
  children: CategoryNode[]
}

function createCategoryNode(category: Category): CategoryNode {
  const { id, name, children } = category
  return {
    key: id,
    title: name.en,
    disabled: false,
    disableCheckbox: false,
    selectable: false,
    children: children.map(createCategoryNode),
  }
}

const categories = ref<CategoryNode[]>([])
categories.value = props.categories.children.map(createCategoryNode)

function onTrackedChecked(checkedKeys: number[]) {
  filterStore.setCategoryIds(checkedKeys)
  filterStore.apply({
    onScroll: false,
  })
}
</script>

<template>
  <div>
    <CheckboxTree :nodes="categories" :searchable="true" @tracked-checked="onTrackedChecked" />
  </div>
</template>
