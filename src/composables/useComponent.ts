import { Component, defineAsyncComponent } from 'vue'

type ComponentLoader = () => Promise<{ default: Component }>

export default function useComponent(componentPath: string, rootComponentDir = '/_nuxt/components/'): ComponentLoader {
  const fallback = defineAsyncComponent(
    () => import(/* @vite-ignore */ `../components/${componentPath}.vue`),
  ) as ComponentLoader
  return defineAsyncComponent({
    loader: async () => {
      try {
        return await import(/* @vite-ignore */ `${rootComponentDir}${componentPath}.vue`)
      }
      catch (error) {
        return fallback
      }
    },
  }) as ComponentLoader
}
