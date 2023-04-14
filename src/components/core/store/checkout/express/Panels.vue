<script setup lang="ts">
import { storeToRefs } from "pinia";
import PanelContent from "./panel/Content.vue";
import { useCheckoutStore } from "~/store/checkout";

const checkoutStore = useCheckoutStore()
const { steps, currentStep } = storeToRefs(checkoutStore)
</script>

<template>
  <div>
    <template v-for="step in steps" :key="step.index">
      <div v-if="!step.hidden">
        <div class="flex-col rounded-t-xl bg-white">
          <slot name="panel-content" :step="step" :current-step="currentStep">
            <PanelContent :step="step" :current-step="currentStep" class="border border-rose-500" />
          </slot>
        </div>
      </div>
    </template>
  </div>
</template>
