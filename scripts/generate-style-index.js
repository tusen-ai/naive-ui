const fs = require('fs').promises
const path = require('path')
const { camelCase } = require('lodash')

;(async () => {
  const srcPath = path.resolve(__dirname, '..', 'src')
  const files = await fs.opendir(
    srcPath
  )
  for await (const file of files) {
    if (file.isDirectory() && !file.name.startsWith('_')) {
      console.log(file.name)
      if (await fs.stat(path.resolve(srcPath, file.name, 'styles')).then(() => false).catch(() => {
        return true
      })) continue
      const code =
        `export { default as ${camelCase(file.name)}Dark } from './dark.js'\n` +
        `export { default as ${camelCase(file.name)}Light } from './light.js'\n`
      console.log(file.name)
      await fs.writeFile(path.resolve(srcPath, file.name, 'styles', 'index.js'), code)
    }
  }
})()
