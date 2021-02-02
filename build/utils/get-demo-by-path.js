const fs = require('fs').promises

const demoLoader = require('../loaders/naive-ui-demo-loader')
const docEntryLoader = require('../loaders/naive-ui-doc-entry-loader')
const docLoader = require('../loaders/naive-ui-doc-loader')
const mdLoader = require('../loaders/naive-ui-md-loader')

module.exports = async function getTransformedVueSrc (path) {
  if (path.endsWith('.demo.md')) {
    const code = await fs.readFile(path, 'utf-8')
    return demoLoader(code, path)
  } else if (path.endsWith('.entry')) {
    return docEntryLoader(path)
  } else if (path.endsWith('.demo-entry.md')) {
    const code = await fs.readFile(path, 'utf-8')
    return docLoader(code, path)
  } else if (path.endsWith('.md')) {
    const code = await fs.readFile(path, 'utf-8')
    return mdLoader(code, path)
  }
}
