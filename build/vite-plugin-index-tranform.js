const transformIndexHtml = (code) => {
  const isTusimple = !!process.env.TUSIMPLE
  switch (process.env.NODE_ENV) {
    case 'production':
      return code.replace(
        /__INDEX__/,
        '/demo/index.' + (isTusimple ? 'ts-prod.js' : 'prod.js')
      )
    default:
      return code.replace(
        /__INDEX__/,
        '/demo/index.' + (isTusimple ? 'ts-dev.js' : 'dev.js')
      )
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
