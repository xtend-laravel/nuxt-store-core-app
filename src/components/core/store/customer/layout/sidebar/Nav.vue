<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'
import { useUserStore } from '~/store/user'

interface Item {
  title: string
  icon: any
  url?: string
  action?: CallableFunction
}

withDefaults(
  defineProps<{
    items: Item[]
    listClasses?: string
    listItemClasses?: string
    listItemIconClasses?: string
  }>(),
  {
    listClasses: 'flex flex-col gap-5',
    listItemClasses: 'hover:text-brand-500 group flex inline-flex items-center gap-4 font-medium',
    listItemIconClasses:
      'text-brand-500 group-hover:fill-brand-500 inline-block h-6 w-6 transition group-hover:translate-x-1',
  },
)

const authStore = useAuthStore()
const userStore = useUserStore()
const { userForm } = storeToRefs(userStore)
const { currentUser } = storeToRefs(authStore)
</script>

<template>
  <nav class="w-full">
    <slot name="override-welcome">
      <div v-if="userForm" class="mb-12">
        <p class="mb-0">Welcome</p>
        <p class="text-xl font-semibold" v-text="currentUser.name" />
      </div>
    </slot>

    <ul :class="listClasses">
      <li v-for="(item, index) in items" :key="index">
        <NuxtLink v-if="item.url" :to="item.url" :class="listItemClasses">
          <component :is="item.icon" v-if="item.icon" :class="listItemIconClasses" />
          {{ item.title }}
        </NuxtLink>

        <button
          v-else
          class="hover:text-brand-500 group inline-flex items-center gap-4 font-medium"
          @click="item.action"
        >
          <component
            :is="item.icon"
            v-if="item.icon"
            class="text-brand-500 group-hover:fill-brand-500 inline-block h-6 w-6 transition group-hover:translate-x-1"
          />
          {{ item.title }}
        </button>
      </li>
    </ul>
  </nav>
</template>
