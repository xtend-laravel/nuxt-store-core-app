import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { defineNuxtModule } from '@nuxt/kit'
import type { Component, ComponentsOptions } from 'nuxt/schema'

const currentDir = dirname(fileURLToPath(import.meta.url))

type getComponentsT = (mode?: 'client' | 'server' | 'all') => Component[]

export default defineNuxtModule<ComponentsOptions>({
  setup(componentOptions, nuxt) {
    console.log('componentOptions', nuxt.options.buildDir)
    for (const layer of nuxt.options._layers) {
      const buildDir = layer.config.buildDir || `${layer.cwd}/.nuxt`
      // console.log('components', join(currentDir(buildDir, 'components.d.ts')))

      // @todo handle dynamic imports
      // const components = await getComponents()
      // for (const component of components) {
      //   addComponent(component)
      // }

      // addComponent(
      //   {
      //     name: `${options.prefix}${e}`,
      //     export: e,
      //     filePath: join(root, group.relativePath),
      //     chunkName: group.chunkName,
      //     mode: 'all',
      //   },
      // )

      // nuxt.hook('prepare:types', ({ references, tsConfig }) => {
      //   tsConfig.compilerOptions!.paths['#components'] = [relative(nuxt.options.rootDir, resolve(nuxt.options.buildDir, 'components'))]
      //   references.push({ path: resolve(buildDir, 'components.d.ts') })
      // })

      // You can check for a custom directory existence to extend for each layer
      // console.log('Custom extension for', layer.cwd, layer)

      // addTemplate(layer)
    }
  },
})
