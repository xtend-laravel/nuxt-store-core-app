<script setup lang="ts">
import { Collapse } from 'vue-collapsed'
import Nav from '~/components/core/store/checkout/standard/panel/Nav.vue'

// @todo I believe we could use collapse as a layout component when changing between panels
// it would change the page which the customer will not know as we are using nuxt it's lightning fast anyway.
// You will need to change the below and init from perhaps a new customer/layout store same way as we do for checkout
// So the theme will be able to override the panels
</script>

<template>
  <Collapse
    :when="currentStep === step.index"
    class="v-collapse overflow-hidden !px-10 !pb-10 !pt-4 text-sm text-gray-500"
    :class="{ '!h-full': step.key === 'payment_method' && currentStep === 5 }"
  >
    <Component :is="step.component" :key="step.key" :current-step-key="step.key" />
    <slot name="panel-nav">
      <Nav :current-step="currentStep" :step="step" />
    </slot>
  </Collapse>
</template>
