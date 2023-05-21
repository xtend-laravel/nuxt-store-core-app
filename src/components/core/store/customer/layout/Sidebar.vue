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
</script>

<template>
  <nav class="w-full">
    <div v-if="userForm" class="mb-12">
      <p class="mb-0">
        Welcome
      </p>
      <p class="text-xl font-semibold">
        {{ userForm.first_name }} <span v-if="userForm.last_name">{{ userForm.last_name }}</span>
      </p>
    </div>

    <ul class="flex flex-col gap-5">
      <li>
        <NuxtLink to="/customer/dashboard" class="group flex inline-flex items-center gap-4 font-medium hover:text-brand-500">
          <IconDashboard
            class="inline-block h-6 w-6 text-brand-500 transition group-hover:translate-x-1 group-hover:fill-brand-500"
          />
          Dashboard
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/order-history"
          class="group flex inline-flex items-center gap-4 font-medium hover:text-brand-500"
        >
          <IconPackage
            class="inline-block h-6 w-6 text-brand-500 transition group-hover:translate-x-1 group-hover:fill-brand-500"
          />
          Orders
        </NuxtLink>
      </li>
      <li>
        <a href="/identity" class="group flex inline-flex items-center gap-4 font-medium hover:text-brand-500">
          <IconUser
            class="inline-block h-6 w-6 text-brand-500 transition group-hover:translate-x-1 group-hover:fill-brand-500"
          />
          Information
        </a>
      </li>
      <li>
        <NuxtLink href="/addresses" class="group flex inline-flex items-center gap-4 font-medium hover:text-brand-500">
          <IconLocationPin
            class="inline-block h-6 w-6 text-brand-500 transition group-hover:translate-x-1 group-hover:fill-brand-500"
          />
          Addresses
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          href="/credit-note"
          class="group flex inline-flex items-center gap-4 font-medium hover:text-brand-500"
        >
          <IconFile
            class="inline-block h-6 w-6 text-brand-500 transition group-hover:translate-x-1 group-hover:fill-brand-500"
          />
          Credit slips
        </NuxtLink>
      </li>
      <li>
        <NuxtLink href="/discount" class="group flex inline-flex items-center gap-4 font-medium hover:text-brand-500">
          <IconTag
            class="inline-block h-6 w-6 text-brand-500 transition group-hover:translate-x-1 group-hover:fill-brand-500"
          />
          Coupons
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          href="/order-follow"
          class="group flex inline-flex items-center gap-4 font-medium hover:text-brand-500"
        >
          <IconClipboard
            class="inline-block h-6 w-6 text-brand-500 transition group-hover:translate-x-1 group-hover:fill-brand-500"
          />
          Merchandise returns
        </NuxtLink>
      </li>
      <li>
        <NuxtLink href="/wishlist" class="group flex inline-flex items-center gap-4 font-medium hover:text-brand-500">
          <IconHeart
            class="inline-block h-6 w-6 text-brand-500 transition group-hover:translate-x-1 group-hover:fill-brand-500"
          />
          My wishlist
        </NuxtLink>
      </li>
      <li>
        <button class="group inline-flex items-center gap-4 font-medium hover:text-brand-500" @click="logout">
          <IconLogout
            class="inline-block h-6 w-6 text-brand-500 transition group-hover:translate-x-1 group-hover:fill-brand-500"
          />
          Logout
        </button>
      </li>
    </ul>
  </nav>
</template>
