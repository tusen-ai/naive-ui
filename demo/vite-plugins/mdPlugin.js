const { readFileSync } = require('fs')

const NaiveUIDemoLoader = require('../loaders/NaiveUIDemoLoader')
const NaiveUIDocEntryLoader = require('../loaders/NaiveUIDocEntryLoader')
const NaiveUIDocLoader = require('../loaders/NaiveUIDocLoader')
const NaiveUIMdLoader = require('../loaders/NaiveUIMdLoader')

module.exports = {
  viteMdPlugin: function () {
    const configureServer = [
      async ({ app, resolver, watcher }) => {
      // check and send hmr message
        watcher.on('change', (file) => {
          if (file.endsWith('.md')) {
            const content = mdTransform2VueTemplateHandlers(file)
            watcher.handleVueReload(file, Date.now(), content)
          }
        })
        app.use(async (ctx, next) => {
          if (/\/@modules\/naive-ui\/lib\/icons\//.test(ctx.path)) {
            ctx.path = ctx.path.replace(/\/@modules\/naive-ui\/lib\/icons\//, '/@naive-ui/lib/icons/')
          } else if (/\/@modules\/naive-ui\/?/.test(ctx.path)) {
            ctx.path = ctx.path.replace(/\/@modules\/naive-ui\/?/, '/@naive-ui/index.js')
          }
          if (/.md$/.test(ctx.path) || ctx.path.endsWith('.entry')) {
            const publicPath = ctx.path
            const filePath = resolver.requestToFile(publicPath)
            const content = mdTransform2VueTemplateHandlers(filePath)
            // make it Treat as vue
            ctx.vue = true
            ctx.body = content
            await next()
          } else {
            await next()
          }
        })
      }
    ]
    return {
      configureServer
    }
  },
  rollupMdPlugin: function () {
    return {
      async load (id) {
        if (id.endsWith('.demo.md')) {
          const code = readFileSync(id).toString()
          return NaiveUIDemoLoader(code, id)
        } else if (id.endsWith('.entry')) {
          return NaiveUIDocEntryLoader(id)
        } else if (id.endsWith('.demo-entry.md')) {
          const code = readFileSync(id).toString()
          return NaiveUIDocLoader(code, id)
        } else if (id.endsWith('.md')) {
          const code = readFileSync(id).toString()
          return NaiveUIMdLoader(code, id)
        }
      }
    }
  }
}

function mdTransform2VueTemplateHandlers (path) {
  let content = null
  const mdContent = readFileSync(path, 'utf-8')
  if (/\.demo\.md$/.test(path)) {
    content = NaiveUIDemoLoader(mdContent, path)
  } else if (path.endsWith('.entry')) {
    content = NaiveUIDocEntryLoader(path)
  } else if (/\.demo-entry\.md$/.test(path)) {
    content = NaiveUIDocLoader(mdContent, path)
  } else {
    content = NaiveUIMdLoader(mdContent, path)
  }
  return content
}
