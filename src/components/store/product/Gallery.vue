<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'
import { useExtendedProductStore } from '~/store/product'

const { currentProduct } = storeToRefs(useExtendedProductStore())
const images = currentProduct.value.attributes.images.gallery || []
</script>

<template>
  <div class="relative">
    <div class="flex gap-5">
      <TabGroup>
        <!-- preview thumbnails -->
        <TabList class="flex flex-col items-start gap-5 text-center">
          <Tab v-for="image in images" :key="image" v-slot="{ selected }" as="template">
            <a
              href="#"
              class="delete-rounded-3xl block w-[40px] border border-transparent transition hover:border-neutral-400 md:w-[80px]"
            >
              <img class="h-full w-full" :src="image" alt="" />
            </a>
          </Tab>
        </TabList>
        <TabPanels class="w-full grow">
          <TabPanel v-for="image in images" :key="`panel-${image}`">
            <img :src="image" alt="" class="h-full w-full overflow-hidden object-cover" />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>
