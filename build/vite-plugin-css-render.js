const cleanCssr = require('./utils/clean-cssr')

module.exports = () => {
  return {
    configureServer: [
      async ({ app }) => {
        app.use(async (ctx, next) => {
          await next()
          // if not ctx.body, it should be a http 304
          if (ctx.path.endsWith('.cssr.js') && ctx.body) {
            ctx.body = cleanCssr(ctx.body.toString())
          }
        })
      }
    ]
  }
}
