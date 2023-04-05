<script setup lang="ts">
import debounce from 'lodash.debounce'
import { useFilterStore } from '#nuxt-store-core/store/filters'

interface Option {
  query: string
  category: string
  value: string
  count: number
}

const filterStore = useFilterStore()

const value = ref('')
const dataSource = ref<Option[]>([])
function onSelect(value: string) {
  console.log('onSelect', value)
}

function getRandomInt(max: number, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function searchResult(query: string, data: any): Option[] {
  return Array.from(data, (_, index) => ({
    query,
    category: data[index].attributes.brand,
    value: query,
    count: data.filter((item: any) => item.attributes.brand === data[index].attributes.brand).length,
  }))
}

const handleSearch = debounce(async (val: string) => {
  console.log('handleSearch', val)
  filterStore.setKeyword(val)
  const data = await filterStore.apply({
    onScroll: false,
  })
  console.log('data', data)
  dataSource.value = val ? searchResult(val, data) : []
}, 1000)
function handleKeyPress(ev: KeyboardEvent) {
  console.log('handleKeyPress', ev)
}
</script>

<template>
  <div class="my-4">
    <a-auto-complete
      v-model:value="value"
      :dropdown-match-select-width="252"
      :options="dataSource"
      class="w-full"
      @select="onSelect"
      @search="handleSearch"
    >
      <a-input placeholder="Filter by name" size="large" @keypress="handleKeyPress" />
      <template #option="item">
        <div style="display: flex; justify-content: space-between">
          <span>
            Found {{ item.query }} in
            <a href="#" rel="noopener noreferrer">
              {{ item.category }}
            </a>
          </span>
          <span>{{ item.count }} results</span>
        </div>
      </template>
    </a-auto-complete>
  </div>
</template>
