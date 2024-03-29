<script setup lang="ts">
import { debounce } from 'throttle-debounce'
import { useAuthStore } from '#nuxt-store-core/store/auth'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'

interface LoginResponseData {
  user: any
}

const props = withDefaults(
  defineProps<{
    mode?: 'login' | 'register' | 'checkout'
  }>(),
  {
    mode: 'checkout',
  },
)

const emit = defineEmits(['closeModal'])

const checkoutStore = useCheckoutStore()
const hasAccount = ref(false)
const emailIsValid = ref(false)
const isAuthenticated = ref(false)
const form = reactive({
  email: '',
  password: '',
  toc: false,
  title: '',
  firstName: '',
  lastName: '',
  errors: {
    email: '',
    password: '',
  },
})
async function fetchAuthCheck() {
  const {
    data: {
      value: { loggedIn },
    },
  } = (await useFetch('/api/auth-check')) as any
  isAuthenticated.value = loggedIn
  useAuthStore().check(loggedIn)

  if (loggedIn && props.mode === 'checkout') {
    await checkoutStore.fetch()
    setTimeout(() => {
      checkoutStore.markStepAsCompleted('connection')
      checkoutStore.setCurrentStep(checkoutStore.nextStep)
    }, 2000)
    return
  }

  if (loggedIn) {
    emit('closeModal')
    return navigateTo('/customer/dashboard')
  }
}
async function loginRequest() {
  try {
    const data: LoginResponseData = await $fetch('/api/login', {
      method: 'POST',
      body: {
        email: form.email,
        password: form.password,
      },
    })
    useAuthStore().setUser(data.user)
    await fetchAuthCheck()
  } catch (error) {
    if (error.statusCode === 401) {
      form.errors.password = 'Invalid password'
    }
  }
}

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
}

// Move to server-side node nitro later
async function checkEmailExists() {
  try {
    const data: any = await $fetch('/api/verify-email', {
      method: 'POST',
      body: {
        email: form.email,
      },
    })
    hasAccount.value = data.emailVerified
  } catch (error) {
    if (error.statusCode === 401) {
      form.errors.password = 'Invalid password'
    }
  }
}

const buttonLabel = computed(() => (hasAccount.value ? 'Sign in' : 'Register'))

function validateEmail() {
  const email = form.email.trim()
  if (!email) {
    return ''
  }
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (pattern.test(email)) {
    emailIsValid.value = true
    return ''
  }
  emailIsValid.value = false
  return 'Please enter a valid email address'
}

const update = debounce(1000, () => {
  form.errors.email = validateEmail()
  checkEmailExists()
})

const disableAction = computed(() => {
  if (!hasAccount.value) {
    return !form.toc || !form.email || !form.title || !form.firstName || !form.lastName || !!form.errors.email
  }
  return !form.email || !form.password || !!form.errors.email
})

async function register() {
  try {
    const data: LoginResponseData = await $fetch('/api/register', {
      method: 'POST',
      body: {
        email: form.email,
        title: form.title,
        first_name: form.firstName,
        last_name: form.lastName,
      },
    })
    useAuthStore().setUser(data.user)
    await fetchAuthCheck()
  } catch (error) {
    if (error.statusCode === 401) {
      form.errors.password = 'Invalid password'
    }
    hasAccount.value = false
  }
}

async function onSubmit() {
  if (hasAccount.value) {
    return await loginRequest()
  }
  return await register()
}

onMounted(() => {
  nextTick(() => {
    fetchAuthCheck()
  })
})

watch([() => form.email, () => form.password], ([email, password]) => {
  form.errors.email = ''
  form.errors.password = ''
  update()
})
</script>

<template>
  <!-- Login box -->
  <div class="m-auto flex max-w-3xl flex-1 flex-col justify-center space-y-5">
    <!-- authenticated -->
    <div
      v-if="isAuthenticated && useAuthStore().user && mode === 'checkout'"
      class="text-center"
      :class="checkoutStore.checkoutType === 'express' ? 'flex flex-col items-center justify-between md:flex-row' : ''"
    >
      <h2 class="text-base">Connected as <span class="text-brand-500" v-text="useAuthStore().user.name" /></h2>
      <p class="mt-2 text-gray-500">
        If this is not you, please
        <button class="text-brand-500 underline" @click="logout">Sign out</button>
      </p>
    </div>

    <!-- not authenticated -->
    <form v-else class="flex flex-col space-y-5" @submit.prevent="onSubmit">
      <div>
        <!-- email input -->
        <input
          v-model="form.email"
          type="email"
          placeholder="Email address"
          class="focus:ring-shadow-none border-brand-500 focus:border-brand-500 w-full rounded-lg border border-2 px-3 py-2 font-medium placeholder:font-normal focus:outline-none focus:ring-0 md:px-4 md:py-3"
        />
        <div v-if="form.errors.email" class="mt-1 text-red-600" v-text="form.errors.email" />
      </div>
      <!-- password input in case email exists -->
      <div v-if="(hasAccount && mode === 'checkout') || mode === 'login'">
        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          class="focus:ring-shadow-none border-brand-500 focus:border-brand-500 w-full rounded-lg border border-2 px-3 py-2 font-medium placeholder:font-normal focus:outline-none focus:ring-0 md:px-4 md:py-3"
        />
        <div v-if="form.errors.password" class="mt-2 text-red-500" v-text="form.errors.password" />
      </div>

      <!-- email doesn't exist -->
      <div v-if="(!hasAccount && emailIsValid && mode === 'checkout') || mode === 'register'">
        <div class="flex justify-between space-x-4">
          <select
            v-model="form.title"
            class="focus:ring-shadow-none border-brand-500 focus:border-brand-500 w-full rounded-lg border border-2 px-3 py-2 font-medium placeholder:font-normal focus:outline-none focus:ring-0 md:px-4 md:py-3"
          >
            <option value="">Social title</option>
            <option>Mr</option>
            <option>Mrs</option>
          </select>
          <input
            v-model="form.firstName"
            type="text"
            placeholder="First name"
            class="focus:ring-shadow-none border-brand-500 focus:border-brand-500 w-full rounded-lg border border-2 px-3 py-2 font-medium placeholder:font-normal focus:outline-none focus:ring-0 md:px-4 md:py-3"
          />
          <input
            v-model="form.lastName"
            type="text"
            placeholder="Last name"
            class="focus:ring-shadow-none border-brand-500 focus:border-brand-500 w-full rounded-lg border border-2 px-3 py-2 font-medium placeholder:font-normal focus:outline-none focus:ring-0 md:px-4 md:py-3"
          />
        </div>
      </div>
      <div
        v-if="(!hasAccount && emailIsValid && mode === 'checkout') || mode === 'register'"
        class="flex items-center justify-center space-x-2"
      >
        <input
          :id="form.toc"
          v-model="form.toc"
          type="checkbox"
          class="focus:ring-shadow-none border-brand-500 focus:border-brand-500 h-4 w-4 rounded-lg border focus:outline-none focus:ring-0"
        />
        <label :for="form.toc" class="text-sm text-neutral-500">
          I agree to the <a href="#" class="text-brand-500">terms and conditions</a>
        </label>
      </div>
      <button
        :disabled="disableAction"
        class="bg-brand-500 hover:bg-brand-600 disabled:hover:bg-brand-500 flex flex-none items-center justify-center rounded-lg px-3 py-2 font-medium text-white disabled:cursor-not-allowed md:px-4 md:py-3"
        v-text="buttonLabel"
      />
      <div class="flex items-center justify-center">
        <span class="border-brand-500 w-full border" />
        <span class="px-4">Or</span>
        <span class="border-brand-500 w-full border" />
      </div>
      <div class="flex flex-wrap justify-center gap-2">
        <button class="inline-flex items-center space-x-2 rounded bg-blue-500 p-2 font-semibold text-white">
          <svg class="h-5 w-5 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            />
          </svg>
        </button>
        <button class="inline-flex items-center space-x-2 rounded bg-blue-400 p-2 font-semibold text-white">
          <svg class="h-5 w-5 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
            />
          </svg>
        </button>
        <button class="inline-flex items-center space-x-2 rounded bg-pink-600 p-2 font-semibold text-white">
          <svg class="h-5 w-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"
            />
          </svg>
        </button>
        <button class="inline-flex items-center space-x-2 rounded bg-blue-600 p-2 font-semibold text-white">
          <svg class="h-5 w-5 fill-current" role="img" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path
                d="M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055"
              />
            </g>
          </svg>
        </button>
        <button class="inline-flex items-center space-x-2 rounded bg-red-600 p-2 font-semibold text-white">
          <svg class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path
              d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"
            />
          </svg>
        </button>
        <button class="inline-flex items-center space-x-2 rounded bg-gray-700 p-2 font-semibold text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="w-5"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                fill="currentColor"
              />
            </g>
          </svg>
        </button>
        <button class="inline-flex items-center space-x-2 rounded bg-red-500 p-2 font-semibold text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="w-5"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z"
                fill="currentColor"
              />
            </g>
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>
