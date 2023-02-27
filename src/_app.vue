<script lang="ts" setup>
import { Ref } from 'vue'
import { RuntimeConfig } from '@nuxt/schema'
import { InitApp } from '~/utils/initApp'
InitApp()
const locale: Ref = useState<string>('locale.i18n')
const config: RuntimeConfig = useRuntimeConfig()
const layout: Ref = computed(() => config.public.appPreset)
</script>

<template>
  <Html :lang="locale" class="light">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=poppins:300,400,500,600,700" rel="stylesheet">
    <Body
      class="text-gray-900 antialiased font-sans m-0 p-0"
    >
      <NuxtLayout :name="layout">
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style lang="postcss">
</style>
