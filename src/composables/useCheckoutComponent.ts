import type { Component } from 'vue'
import { resolveDynamicComponent } from 'vue'

export default function useCheckoutComponent(componentName: string): Component | string {
  const canResolveComponent = (name: any) => typeof resolveDynamicComponent(name) !== 'string'
  const component = `CoreStoreCheckoutComponents${componentName}` as string
  const themeComponent = component.substring(4) as string
  console.log(themeComponent, canResolveComponent(themeComponent), component.substring(4))
  return (canResolveComponent(themeComponent) ? themeComponent : component) as Component | string
}
