<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const isAuthenticated = ref(false)
const serverRequest = ref('')
const serverResponse = ref({})
const loginRequest = async () => {
  await useFetch('/api/login', {
    method: 'POST',
    body: {
      email: 'adam@jl-store.test',
      password: 'secret20',
    },
  }).then((response: any) => {
    serverRequest.value = 'login'
    serverResponse.value = response.data
    useAuthStore().setUser(response.data.value.user)
  })
}

const fetchProfile = async () => {
  await useFetch('/api/profile').then((response: any) => {
    serverRequest.value = 'profile'
    serverResponse.value = response.data
  })
}

async function fetchAuthCheck() {
  const { data: { value: { loggedIn } } } = await useFetch('/api/auth-check') as any
  serverRequest.value = 'fetchAuthCheck'
  serverResponse.value = { loggedIn }
  isAuthenticated.value = loggedIn
  useAuthStore().check(loggedIn)
}

onMounted(() => {
  nextTick(() => {
    fetchAuthCheck()
  })
})
</script>

<template>
  <div
    class="antialiased bg-white dark:bg-black text-black dark:text-white min-h-screen place-content-center flex flex-col items-center justify-center text-sm sm:text-base"
  >
    <h1
      class="text-black dark:text-white text-xl font-semibold text-center my-4"
    >
      Nuxt 3 - Nitro Server Testing <span v-if="isAuthenticated">- Authenticated</span>
    </h1>
    <div style="width:40%;">
      <div class="px-10">
        <ul class="flex justify-between">
          <li><a href="#" @click="init">Init</a></li>
          <li><a href="#" @click="loginRequest">Login</a></li>
          <li><a href="#" @click="fetchProfile">Profile</a></li>
          <li><a href="#">Orders</a></li>
          <li><a href="#">Addresses</a></li>
          <li><a href="#">Categories</a></li>
          <li><a href="#">Products</a></li>
        </ul>
      </div>

      <div class="border border-gray-200 my-4">
        <div
          class="gradient-border gradient-border-square gradient-border-documentation"
        />
        <div
          class="rounded-xl flex lg:flex-col items-center justify-center gap-y-4 bg-white dark:bg-gray-900"
        >
          <div
            class="py-6 lg:py-7 px-5 rounded-xl w-full"
          >
            <div class="space-y text-black dark:text-white">
              <h3 class="font-semibold text-xl">API Response for {{ serverRequest }}</h3>
              <p class="text-gray-700 dark:text-gray-300">
                This is the response from the nitro server endpoint.
              </p>
            </div>
            <pre class="w-full">
              {{ serverResponse }}
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
