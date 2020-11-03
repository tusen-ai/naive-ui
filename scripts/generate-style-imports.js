const fs = require('fs').promises
const path = require('path')
const { camelCase } = require('lodash')

;(async () => {
  const srcPath = path.resolve(__dirname, '..', 'src')
  const files = await fs.opendir(
    srcPath
  )
  let code = ''
  for await (const file of files) {
    if (file.isDirectory() && !file.name.startsWith('_')) {
      if (await fs.stat(path.resolve(srcPath, file.name, 'styles')).then(() => false).catch(() => {
        return true
      })) continue
      code += `export {
  ${camelCase(file.name)}Dark,
  ${camelCase(file.name)}Light
} from '../${file.name}/styles\n`
      // await fs.writeFile(path.resolve(srcPath, file.name, 'styles', 'index.js'), code)
    }
  }
  console.log(code)
})()
