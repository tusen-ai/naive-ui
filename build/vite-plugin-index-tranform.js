const transformIndexHtml = (code) => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return code.replace(/__INDEX__/, '/demo/index.prod.js')
    default:
      return code.replace(/__INDEX__/, '/demo/index.dev.js')
  }
}

const demoIndexTransFormPlugin = {
  name: 'demo-transform',
  enforce: 'pre',
  // vite build is production will not invoke `transformIndexHtml`
  transform (code, id) {
    if (id.endsWith('.html')) {
      return { code: transformIndexHtml(code), map: null }
    }
  },
  transformIndexHtml
}

module.exports = demoIndexTransFormPlugin
