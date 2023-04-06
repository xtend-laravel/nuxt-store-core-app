import type { Component } from 'vue'
import { defineAsyncComponent } from 'vue'

type ComponentLoader = () => Promise<{ default: Component }>

export default function useComponent(componentPath: string, rootComponentDir = '/_nuxt/components/'): ComponentLoader {
  const fallback = defineAsyncComponent(() => import(`../components/${componentPath}.vue`)) as ComponentLoader
  return defineAsyncComponent({
    loader: async () => {
      try {
        return await import(`${rootComponentDir}${componentPath}.vue`)
      } catch (error) {
        return fallback
      }
    },
  }) as ComponentLoader
}
