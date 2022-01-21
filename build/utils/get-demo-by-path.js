const fs = require('fs-extra')

const demoLoader = require('../loaders/naive-ui-demo-loader')
const docLoader = require('../loaders/naive-ui-doc-loader')

module.exports = async function getTransformedVueSrc (path) {
  if (path.endsWith('.demo.md') || path.endsWith('.demo.vue')) {
    const code = await fs.readFile(path, 'utf-8')
    const type = path.endsWith('.vue') ? 'vue' : 'md'
    return demoLoader(code, path, type)
  } else if (path.endsWith('.md')) {
    const code = await fs.readFile(path, 'utf-8')
    return docLoader(code, path)
  }
}
