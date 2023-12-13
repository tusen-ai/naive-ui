const transformIndexHtml = (code) => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return code.replace(/__INDEX__/, 'demo/index.prod.js')
    default:
      return code.replace(/__INDEX__/, 'demo/index.dev.js')
  }
}

const demoIndexTransFormPlugin = {
  name: 'demo-transform',
  transformIndexHtml: {
    order: 'pre',
    handler: (code) => {
      return transformIndexHtml(code)
    }
  }
}

module.exports = demoIndexTransFormPlugin
