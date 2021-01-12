const createVuePlugin = require('@vitejs/plugin-vue')
const getDemoByPath = require('./utils/get-demo-by-path')
const createRollupCssRenderPlugin = require('./rollup-plugin-css-render')
const demoIndexTransFormPlugin = require('./vite-plugin-index-tranform')

const fileRegex = /\.(md)|(entry)$/

const fn = async (id) => {
  if (fileRegex.test(id)) {
    const code = await getDemoByPath(id)
    return {
      code: code,
      map: null
    }
  }
}
const vuePlugin = createVuePlugin({
  include: [/\.vue$/, /\.md$/, /\.entry$/]
})

const createNaiveDemoVitePlugin = () => {
  const naiveDemoVitePlugin = {
    name: 'demo-vite',
    transform (_, id) {
      return fn(id)
    },
    config () {
      return {
        transformInclude: /\.(md|entry)$/
      }
    },
    async handleHotUpdate (ctx) {
      const { file } = ctx
      if (fileRegex.test(file)) {
        const code = await getDemoByPath(file)
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
