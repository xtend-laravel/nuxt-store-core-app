<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import IconCheck from '~icons/feather/check'

const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const availableLocales = computed(() => {
  return locales.value
})
const open = ref(false)
</script>

<template>
  <div>
    <Menu as="div" class="relative" @mouseenter="open = true" @mouseleave="open = false">
      <MenuButton class="cursor-pointer text-sm uppercase hover:opacity-75" v-text="locale" />
      <div v-show="open" class="absolute left-0 top-0 z-10 -ml-4 mt-4 w-48 py-3">
        <MenuItems static class="w-full rounded-md border border-neutral-50 bg-white py-1.5 shadow-lg">
          <div v-for="item in availableLocales" :key="item.code" class="flex w-full flex-col">
            <MenuItem
              class="group px-4 py-2 text-sm font-light text-gray-400 hover:text-black"
              :class="{ '!text-black': item.code === locale }"
            >
              <NuxtLink
                :to="switchLocalePath(item.code)"
                class="flex w-full items-center justify-between gap-3 transition"
              >
                <div class="flex items-center gap-2">
                  <img :src="`/images/${item.code}.webp`" :alt="item.code" class="inline h-3" />
                  <span v-text="item.name" />
                </div>
                <IconCheck v-if="item.code === locale" class="text-brand-500 h-4 w-4" />
                <IconCheck v-else class="hidden h-4 w-4 group-hover:inline-flex" />
              </NuxtLink>
            </MenuItem>
          </div>
        </MenuItems>
      </div>
    </Menu>
  </div>
</template>
