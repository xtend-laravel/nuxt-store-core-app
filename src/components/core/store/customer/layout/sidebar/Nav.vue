<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from 'nuxt-store-core-app/src/store/user'
import IconDashboard from '~icons/carbon/dashboard'
import IconPackage from '~icons/carbon/package'
import IconUser from '~icons/carbon/user'
import IconLogout from '~icons/carbon/logout'
import IconLocationPin from '~icons/carbon/location'
import IconFile from '~icons/carbon/document'
import IconTag from '~icons/carbon/tag'
import IconClipboard from '~icons/carbon/copy'
import IconHeart from '~icons/feather/heart'
import { useAuthStore } from '#nuxt-store-core/store/auth'

defineProps<{
  items: any[]
}>()

const userStore = useUserStore()
const { userForm } = storeToRefs(userStore)

async function logout() {
  const {
    data: {
      value: { loggedIn },
    },
    error,
  } = (await useFetch('/api/logout')) as any
  if (error.value) {
    console.error(error.value)
    return
  }
  useAuthStore().logout()
  await navigateTo('/')
}
// @todo Note: currently copied over from theme you will need to pass navigation props to this component
</script>

<template>
  <nav class="w-full">
    <div v-if="userForm" class="mb-12">
      <p class="mb-0">Welcome</p>
      <p class="text-xl font-semibold">
        {{ userForm.first_name }} <span v-if="userForm.last_name">{{ userForm.last_name }}</span>
      </p>
    </div>

    <ul class="flex flex-col gap-5">
      <li>
        <NuxtLink
          to="/customer/dashboard"
          class="hover:text-brand-500 group flex inline-flex items-center gap-4 font-medium"
        >
          <IconDashboard
            class="text-brand-500 group-hover:fill-brand-500 inline-block h-6 w-6 transition group-hover:translate-x-1"
          />
          Dashboard
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/order-history"
          class="hover:text-brand-500 group flex inline-flex items-center gap-4 font-medium"
        >
          <IconPackage
            class="text-brand-500 group-hover:fill-brand-500 inline-block h-6 w-6 transition group-hover:translate-x-1"
          />
          Orders
        </NuxtLink>
      </li>
      <li>
        <a href="/identity" class="hover:text-brand-500 group flex inline-flex items-center gap-4 font-medium">
          <IconUser
            class="text-brand-500 group-hover:fill-brand-500 inline-block h-6 w-6 transition group-hover:translate-x-1"
          />
          Information
        </a>
      </li>
      <li>
        <NuxtLink href="/addresses" class="hover:text-brand-500 group flex inline-flex items-center gap-4 font-medium">
          <IconLocationPin
            class="text-brand-500 group-hover:fill-brand-500 inline-block h-6 w-6 transition group-hover:translate-x-1"
          />
          Addresses
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          href="/credit-note"
          class="hover:text-brand-500 group flex inline-flex items-center gap-4 font-medium"
        >
          <IconFile
            class="text-brand-500 group-hover:fill-brand-500 inline-block h-6 w-6 transition group-hover:translate-x-1"
          />
          Credit slips
        </NuxtLink>
      </li>
      <li>
        <NuxtLink href="/discount" class="hover:text-brand-500 group flex inline-flex items-center gap-4 font-medium">
          <IconTag
            class="text-brand-500 group-hover:fill-brand-500 inline-block h-6 w-6 transition group-hover:translate-x-1"
          />
          Coupons
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          href="/order-follow"
          class="hover:text-brand-500 group flex inline-flex items-center gap-4 font-medium"
        >
          <IconClipboard
            class="text-brand-500 group-hover:fill-brand-500 inline-block h-6 w-6 transition group-hover:translate-x-1"
          />
          Merchandise returns
        </NuxtLink>
      </li>
      <li>
        <NuxtLink href="/wishlist" class="hover:text-brand-500 group flex inline-flex items-center gap-4 font-medium">
          <IconHeart
            class="text-brand-500 group-hover:fill-brand-500 inline-block h-6 w-6 transition group-hover:translate-x-1"
          />
          My wishlist
        </NuxtLink>
      </li>
      <li>
        <button class="hover:text-brand-500 group inline-flex items-center gap-4 font-medium" @click="logout">
          <IconLogout
            class="text-brand-500 group-hover:fill-brand-500 inline-block h-6 w-6 transition group-hover:translate-x-1"
          />
          Logout
        </button>
      </li>
    </ul>
  </nav>
</template>
