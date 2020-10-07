const fs = require('fs').promises
const path = require('path')

function generateCssr (literal) {
  return `export default \`${literal}\`\n`
}

;(async () => {
  const file = await fs.readFile(
    path.resolve(
      __dirname,
      '..',
      'node_modules',
      'vue-virtual-scroller',
      'dist',
      'vue-virtual-scroller.css'
    )
  )
  const cssLiteral = file.toString()
  await fs.writeFile(path.resolve(
    __dirname,
    '..',
    'src',
    '_styles/',
    'global-style/',
    'vue-virtual-scroller.cssr.js'
  ), generateCssr(cssLiteral))
})()
