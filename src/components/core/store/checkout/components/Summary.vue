<script setup lang="ts"></script>

<template>
  <section class="border-base mt-6 min-h-[700px] rounded shadow-lg">
    <h4 class="mb-4 px-4 pt-4 font-medium underline">Order summary</h4>
    <div class="bg-white p-6">
      <div class="font-heading mb-3 flex items-center justify-between bg-gray-50 px-4 py-2 font-medium leading-8">
        <span>Subtotal</span>
        <span class="flex items-center text-base">
          <span class="mr-2 text-base">$</span>
          <span>710,70</span>
        </span>
      </div>
      <div class="font-heading mb-3 flex items-center justify-between bg-gray-50 px-4 py-2 font-medium leading-8">
        <span>Shipping</span>
        <span class="flex items-center text-base">
          <span class="mr-2 text-base">$</span>
          <span>10,00</span>
        </span>
      </div>
      <div class="font-heading mb-3 flex items-center justify-between bg-gray-50 px-4 py-2 font-medium leading-8">
        <span>Total</span>
        <span class="text-brand-600 flex items-center text-base">
          <span class="mr-2 text-base">$</span>
          <span>720,70</span>
        </span>
      </div>
    </div>
    <div class="mb-3 px-8">
      <label class="text-brand-500 mb-3 block text-sm">Apply promo code:</label>
      <div class="relative mb-4 flex w-full flex-wrap items-stretch">
        <input
          type="text"
          placeholder="Enter your promo code here .."
          class="focus:ring-shadow-none border-brand-500 focus:border-brand-500 relative h-10 w-px flex-1 flex-auto flex-shrink flex-grow rounded-l-md border px-3 text-xs leading-normal focus:outline-none focus:ring-0"
        />
        <div class="-mr-px flex">
          <!-- Apply button -->
          <button
            type="button"
            class="focus:shadow-outline-brand bg-brand-500 hover:bg-brand-600 focus:border-brand-700 active:bg-brand-700 flex items-center justify-center rounded-r-md border border-transparent px-4 text-xs font-medium leading-6 text-white transition duration-150 ease-in-out focus:outline-none"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
