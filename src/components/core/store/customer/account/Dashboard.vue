<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAccountDashboardStore } from '~/store/accountDashboard'

const accountDashboardStore = useAccountDashboardStore()
accountDashboardStore.fetch()

const { stats, latestOrder } = storeToRefs(accountDashboardStore)
</script>

<template>
  <div>
    <slot name="override-stats" :stats="stats">
      <CoreStoreCustomerAccountDashboardStats :stats="stats" />
    </slot>

    <slot name="override-latest-order" :latest-order="latestOrder">
      <CoreStoreCustomerAccountDashboardLatestOrder :latest-order="latestOrder" />
    </slot>
  </div>
</template>
