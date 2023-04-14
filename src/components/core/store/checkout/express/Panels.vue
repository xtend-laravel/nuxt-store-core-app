<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import PanelContent from "./panel/Content.vue";
import { useCheckoutStore } from "~/store/checkout";

const checkoutStore = useCheckoutStore()
const { steps, currentStep } = storeToRefs(checkoutStore)
const useAuth = useAuthStore()
</script>

<template>
  <div>
    <template v-for="step in steps" :key="step.id">
      <div v-if="!step.hidden">
        <div class="flex-col rounded-t-xl bg-white" v-if="step.key !== 'connection' && useAuth.isAuthenticated || step.key === 'connection'">
          <slot name="panel-content" :step="step" :current-step="currentStep">
            <PanelContent :step="step" :current-step="currentStep"/>
          </slot>
        </div>
      </div>
    </template>
  </div>
</template>
