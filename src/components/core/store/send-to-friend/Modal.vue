<script setup lang="ts">
const props = defineProps<{
  modalSendToFriendVisible: boolean
  item: any
}>()

const emit = defineEmits<{
  (e: 'closeModal'): void
}>()

const form = reactive({
  errors: {},
  fullName: '',
  email: '',
  toc: false,
})

const disableAction = computed(() => {
  return !form.email || !form.fullName || !!form.errors.email
})

const buttonLabel = computed(() => {
  return 'Send'
})
const images = props.item.attributes.images.gallery || []
const thumbnail = ref(images[0])

function closeModal() {
  emit('closeModal')
}

function onSubmit() {
  console.log('sendToFriend')
}
</script>

<template>
  <div class="modal" :class="{ 'modal-open': modalSendToFriendVisible }">
    <div class="modal-box relative max-w-5xl p-0">
      <div class="bg-brand-400 w-full p-4 text-lg font-semibold text-white">
        <span class="mr-2">&#10003;</span> Send this product to a friend
      </div>
      <label for="sendToFriendModal" class="absolute right-3 top-3 z-50" @click="closeModal">
        <button class="btn btn-sm btn-circle btn-outline text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </label>
      <div class="card lg:card-side bg-base-100 shadow-xl">
        <figure class="m-0 w-96">
          <img :src="thumbnail" :alt="item.attributes.name" class="rounded-t-lg" />
        </figure>
        <div class="card-body">
          <div class="mb-4 text-lg font-semibold">
            {{ item.attributes.name }}
          </div>
          <form class="flex flex-col space-y-5" @submit.prevent="onSubmit">
            <div>
              <input
                v-model="form.fullName"
                type="text"
                placeholder="Name of your friend"
                class="focus:ring-shadow-none border-brand-500 focus:border-brand-500 w-full rounded-lg border border-2 px-3 py-2 font-medium placeholder:font-normal focus:outline-none focus:ring-0 md:px-4 md:py-3"
              />
            </div>
            <div>
              <!-- email input -->
              <input
                v-model="form.email"
                type="email"
                placeholder="Email address of your friend"
                class="focus:ring-shadow-none border-brand-500 focus:border-brand-500 w-full rounded-lg border border-2 px-3 py-2 font-medium placeholder:font-normal focus:outline-none focus:ring-0 md:px-4 md:py-3"
              />
              <div v-if="form.errors.email" class="mt-1 text-red-600" v-text="form.errors.email" />
            </div>
            <div class="flex items-center justify-center space-x-2">
              <input
                :id="form.toc"
                v-model="form.toc"
                type="checkbox"
                class="focus:ring-shadow-none border-brand-500 focus:border-brand-500 h-4 w-4 rounded-lg border focus:outline-none focus:ring-0"
              />
              <label :for="form.toc" class="text-sm text-neutral-500">
                I accept <a href="#" class="text-brand-500">privacy policy</a> rules
              </label>
            </div>
            <button
              :disabled="disableAction"
              class="bg-brand-500 hover:bg-brand-600 disabled:hover:bg-brand-500 flex flex-none items-center justify-center rounded-lg px-3 py-2 font-medium uppercase text-white disabled:cursor-not-allowed md:px-4 md:py-3"
              v-text="buttonLabel"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
