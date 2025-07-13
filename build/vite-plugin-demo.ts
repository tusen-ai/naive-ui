import type { Plugin } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue'
import { getTransformedVueSrc } from './utils/get-demo-by-path'
import { cssRenderPlugin } from './vite-plugin-css-render'
import { demoIndexTransFormPlugin } from './vite-plugin-index-tranform'

const fileRegex = /\.(md|vue)$/

const vuePlugin = createVuePlugin({
  include: [/\.vue$/, /\.md$/]
})

export function createDemoPlugin(): Plugin[] {
  const naiveDemoVitePlugin: Plugin = {
    name: 'demo-vite',
    async transform(_, id) {
      if (fileRegex.test(id)) {
        return await getTransformedVueSrc(id)
      }
    },
    async handleHotUpdate(ctx) {
      const { file } = ctx
      if (fileRegex.test(file)) {
        const code = await getTransformedVueSrc(file)
        if (code === undefined)
          return []

        const { handleHotUpdate } = vuePlugin
        if (typeof handleHotUpdate === 'function') {
          return handleHotUpdate({
            ...ctx,
            read: () => code
          })
        }
        else if (handleHotUpdate?.handler) {
          return handleHotUpdate.handler({
            ...ctx,
            read: () => code
          })
        }
        return []
      }
    }
  }

  const cssrPlugin = cssRenderPlugin()

  return [demoIndexTransFormPlugin, naiveDemoVitePlugin, vuePlugin, cssrPlugin]
}
