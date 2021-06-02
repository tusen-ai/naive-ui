const express = require('express')
const { h, createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const { setup } = require('@css-render/vue3-ssr')
const { NButton } = require('../lib')
const { NSsrProvider } = require('../lib/ssr')

const app = express()
const vueAppOptions = {
  render () {
    return h(NSsrProvider, null, {
      default: () => h(NButton, null, { default: () => 'btn' })
    })
  }
}

app.use((req, res) => {
  const ssrApp = createSSRApp(vueAppOptions)
  const { collect } = setup(ssrApp)
  res.write('<!doctype html><html><head><title>SSR Test</title></head><body>')
  renderToString(ssrApp).then((html) => {
    res.write(collect() + html)
    res.write('</body></html>')
    res.end()
  })
})

app.listen(8086)
