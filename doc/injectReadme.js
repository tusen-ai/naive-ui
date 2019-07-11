const path = require('path')
const fs = require('fs')

const showdown = require('showdown')
const converter = new showdown.Converter({
  tables: true
})
const text = fs.readFileSync(path.resolve(__dirname, '..', 'README.md')).toString()
const html = converter.makeHtml(text)

const htmlPath = path.resolve(__dirname, '../demo/readme.js')
fs.writeFileSync(htmlPath, 'export default `<div class="markdown-body">' + html + '</div>`\n')
