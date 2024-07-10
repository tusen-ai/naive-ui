import createVuePlugin from '@vitejs/plugin-vue'
import { getTransformedVueSrc } from './utils/get-demo-by-path'
import { createCssrPlugin } from './vite-plugin-css-render'
import { demoIndexTransFormPlugin as siteIndexTransFormPlugin } from './vite-plugin-index-tranform'

const fileRegex = /\.(md|vue)$/

const vuePlugin = createVuePlugin({
  include: [/\.vue$/, /\.md$/]
})

export const createDemoPlugin = () => {
  const naiveDemoVitePlugin = {
    name: 'demo-vite',
    transform (_, id) {
      if (fileRegex.test(id)) {
        return getTransformedVueSrc(id)
      }
    },
    async handleHotUpdate (ctx) {
      const { file } = ctx
      if (fileRegex.test(file)) {
        const code = await getTransformedVueSrc(file)
        return vuePlugin.handleHotUpdate({
          ...ctx,
          read: () => code
        })
      }
    }
  }

  const cssrPlugin = createCssrPlugin()

  return [siteIndexTransFormPlugin, naiveDemoVitePlugin, vuePlugin, cssrPlugin]
}
