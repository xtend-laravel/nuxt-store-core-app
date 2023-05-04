<script setup lang="ts">
import { defineProps } from 'vue'

const {locale} = useI18n()

const props = defineProps<{
  value: Object,
  defaultLocale?: string
}>()
</script>

<template>
  <span>{{ value[locale] || value[defaultLocale] }}</span>
</template>
