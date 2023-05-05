<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  value: Object
  defaultLocale?: string
}>()

const { locale } = useI18n()
</script>

<template>
  <span>{{ value[locale] || value[defaultLocale] }}</span>
</template>
