<script setup lang="ts">
import type { LatestOrder, Stats } from '#nuxt-store-core/store/customer/dashboard'

interface Item {
  title: string
  value: string | number
  description: string
  icon: any
}

withDefaults(
  defineProps<{
    items: Item[]
    stats: Stats
    latestOrder: LatestOrder
    containerClasses?: string
    columnClasses?: string
    columnIconWrapperClasses?: string
  }>(),
  {
    containerClasses: 'stats mt-10 w-full shadow',
    columnClasses: 'stat place-items-center',
    columnIconWrapperClasses: 'stat-figure text-brand-500',
  },
)
</script>

<template>
  <div :class="containerClasses">
    <slot>
      <CoreStoreCustomerDashboardStatsColumn
        v-for="(item, index) in items"
        :key="index"
        :title="item.title"
        :value="item.value"
        :description="item.description"
        :wrapper-classes="columnClasses"
        :icon-wrapper-classes="columnIconWrapperClasses"
      >
        <template #icon>
          <component :is="item.icon" />
        </template>
      </CoreStoreCustomerDashboardStatsColumn>
    </slot>
  </div>
</template>
