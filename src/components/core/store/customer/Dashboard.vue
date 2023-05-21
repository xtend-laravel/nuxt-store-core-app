<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAccountDashboardStore } from '#nuxt-store-core/store/customer/dashboard'

const accountDashboardStore = useAccountDashboardStore()
accountDashboardStore.fetch()

const { stats, latestOrder } = storeToRefs(accountDashboardStore)
</script>

<template>
  <div>
    <slot name="override-stats" :stats="stats">
      <CoreStoreCustomerDashboardStats :stats="stats" />
    </slot>

    <slot name="override-latest-order" :latest-order="latestOrder">
      <CoreStoreCustomerDashboardLatestOrder :latest-order="latestOrder" />
    </slot>
  </div>
</template>
