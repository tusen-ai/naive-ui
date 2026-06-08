import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { getTransformedVueSrc } from './utils/get-demo-by-path'
import { cssRenderPlugin } from './vite-plugin-css-render'
import { demoIndexTransFormPlugin } from './vite-plugin-index-tranform'

const fileRegex = /\.(md|vue)$/

export function createDemoPlugin(): Plugin[] {
  const vuePlugin = vue({
    include: [/\.vue$/, /\.md$/]
  })

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
          return
        ctx.read = () => code
      }
    }
  }

  const cssrPlugin = cssRenderPlugin()

  return [demoIndexTransFormPlugin, naiveDemoVitePlugin, vuePlugin, cssrPlugin]
}
