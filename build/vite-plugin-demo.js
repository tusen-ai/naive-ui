const getDemoByPath = require('./utils/get-demo-by-path')

module.exports = function () {
  const configureServer = [
    async ({ app, resolver, watcher }) => {
      // check and send hmr message
      watcher.on('change', async (file) => {
        if (file.endsWith('.md')) {
          const content = await getDemoByPath(file)
          watcher.handleVueReload(file, Date.now(), content)
        }
      })
      app.use(async (ctx, next) => {
        if (/\/@modules\/naive-ui\/?/.test(ctx.path)) {
          ctx.path = ctx.path.replace(/\/@modules\/naive-ui\/?/, '/@naive-ui/index.js')
        }
        if (/\.md$/.test(ctx.path) || /\.entry$/.test(ctx.path)) {
          const publicPath = ctx.path
          const filePath = resolver.requestToFile(publicPath)
          const content = await getDemoByPath(filePath)
          // make it Treat as vue
          ctx.vue = true
          ctx.body = content
        }
        await next()
      })
    }
  ]
  return {
    configureServer
  }
}
