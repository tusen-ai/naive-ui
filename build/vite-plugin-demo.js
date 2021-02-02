const createVuePlugin = require('@vitejs/plugin-vue')
const getTransformedVueSrc = require('./utils/get-demo-by-path')
const createRollupCssRenderPlugin = require('./rollup-plugin-css-render')
const demoIndexTransFormPlugin = require('./vite-plugin-index-tranform')

const fileRegex = /\.(md|entry)$/

const vuePlugin = createVuePlugin({
  include: [/\.vue$/, /\.md$/, /\.entry$/]
})

const createNaiveDemoVitePlugin = () => {
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

  const rollupCssRenderPlugin = createRollupCssRenderPlugin()

  return [
    demoIndexTransFormPlugin,
    naiveDemoVitePlugin,
    vuePlugin,
    rollupCssRenderPlugin
  ]
}

module.exports = createNaiveDemoVitePlugin
