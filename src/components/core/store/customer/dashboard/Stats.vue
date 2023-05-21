<script setup lang="ts">
import type { LatestOrder, Stats } from '~/store/accountDashboard'

withDefaults(
  defineProps<{
    stats: Stats
    latestOrder: LatestOrder
    containerClasses: string
    columnClasses: string
    columnIconWrapperClasses: string
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
    <CoreStoreCustomerDashboardStatsColumn
      title="Orders"
      :value="stats.orders"
      :wrapper-classes="columnClasses"
      :icon-wrapper-classes="columnIconWrapperClasses"
      description="Last order 2 days ago"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-8 w-8 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </template>
    </CoreStoreCustomerDashboardStatsColumn>

    <CoreStoreCustomerDashboardStatsColumn
      title="Total Spent"
      :value="stats.total_spent"
      :wrapper-classes="columnClasses"
      :icon-wrapper-classes="columnIconWrapperClasses"
      description="↘︎ Last order &euro;100.50"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-8 w-8 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </template>
    </CoreStoreCustomerDashboardStatsColumn>

    <CoreStoreCustomerDashboardStatsColumn
      title="Points Earned"
      :value="stats.points_earned"
      :wrapper-classes="columnClasses"
      :icon-wrapper-classes="columnIconWrapperClasses"
      description="↗︎ Last order 50 points earned"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-8 w-8 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </template>
    </CoreStoreCustomerDashboardStatsColumn>
  </div>
</template>
