const fs = require('fs')
const path = require('path')
const express = require('express')
const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const { setup } = require('@css-render/vue3-ssr')
const { default: App } = require('./app')

const server = express()

// serve js
server.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    // the file will be in dist folder after build
    // so no `dist` is required in path.resolve
    res.send(fs.readFileSync(path.resolve(__dirname, 'client.js'), 'utf8'))
  } else {
    next()
  }
})

// serve html
server.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    next()
    return
  }
  const ssrApp = createSSRApp(App)
  res.write('<!DOCTYPE html><html><head><title>SSR Test</title></head><body>')
  const { collect } = setup(ssrApp)
  renderToString(ssrApp).then((html) => {
    res.write(collect())
    res.write(`<div id="app">${html}</div>`)
    res.write('<script src="dist/client.js"></script></body></html>')
    res.end()
  })
})

server.listen(8086)
