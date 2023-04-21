<script lang="ts">
import type { ComponentObjectPropsOptions } from '@vue/runtime-core'

interface TransitionProps {
  enterActiveClass?: string
  enterFromClass?: string
  enterToClass?: string
  leaveActiveClass?: string
  leaveFromClass?: string
  leaveToClass?: string
}

interface SlideOutPanelProps {
  label?: string
  error?: string
  drawerOpen?: boolean
  drawerClasses?: {
    wrapper?: string
    overlay?: string
    panel?: string
  }
  transition?: TransitionProps
}

export default defineComponent({
  props: {
    transition: {
      type: Object as () => TransitionProps,
      default: () => ({
        enterActiveClass: 'transition transform duration-300 ease-in-out',
        enterFromClass: 'translate-x-full',
        enterToClass: 'translate-x-0',
        leaveActiveClass: 'transition ease-in duration-200',
        leaveFromClass: 'translate-x-0',
        leaveToClass: 'translate-x-full',
      }),
    },
    label: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    drawerOpen: {
      type: Boolean,
      default: false,
    },
    drawerClasses: {
      type: Object as () => SlideOutPanelProps['drawerClasses'],
      default: () => ({
        wrapper: 'overflow-hidden slide-out-panel-wrapper',
        overlay: 'max-w-screen fixed inset-0 z-50 h-screen w-screen bg-gray-300/50',
        panel: 'fixed inset-y-0 right-0 z-[500] flex max-w-full pl-10 sm:pl-16',
      }),
    },
  } as ComponentObjectPropsOptions<SlideOutPanelProps>,
  setup(props) {
    const drawerClasses = computed(() => props.drawerClasses as SlideOutPanelProps['drawerClasses'])
    const transition = computed(() => props.transition as TransitionProps)
    const drawerOpen = computed(() => props.drawerOpen as unknown as boolean)

    const closeDrawer = () => {}

    return {
      drawerOpen,
      drawerClasses,
      transition,
      closeDrawer,
    }
  },
})
</script>

<template>
  <div :class="drawerClasses.wrapper">
    <Transition
      :enter-active-class="transition.enterActiveClass"
      :enter-from-class="transition.enterFromClass"
      :enter-to-class="transition.enterToClass"
      :leave-active-class="transition.leaveActiveClass"
      :leave-from-class="transition.leaveFromClass"
      :leave-to-class="transition.leaveToClass"
    >
      <slot v-if="drawerOpen" name="drawer-panel" :drawer-panel-classes="drawerClasses.panel">
        <div :class="drawerClasses.panel" />
      </slot>
    </Transition>
    <slot
      v-if="drawerOpen"
      name="drawer-overlay"
      class="max-w-screen fixed inset-0 z-50 h-screen w-screen bg-gray-300/50"
      :drawer-overlay-classes="drawerClasses.overlay"
      @click="closeDrawer"
    >
      <div :class="drawerClasses.overlay" />
    </slot>
  </div>
</template>
