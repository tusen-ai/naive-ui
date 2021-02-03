const fs = require('fs').promises
const { walk, outDirs } = require('./utils')

const alias = {
  __DEV__: "process.env.NODE_ENV !== 'production'"
}

exports.replaceDefine = async () => {
  const aliasKeys = Object.keys(alias)
  const patterns = {}
  aliasKeys.forEach((key) => {
    patterns[key] = new RegExp(key, 'g')
  })
  for (const dir of outDirs) {
    for await (const p of walk(dir)) {
      const code = await fs.readFile(p, 'utf-8')
      for (const key of aliasKeys) {
        const pattern = patterns[key]
        if (pattern.test(code)) {
          const outCode = code.replace(pattern, alias[key])
          await fs.writeFile(p, outCode)
        }
      }
    }
  }
}

if (require.main === module) {
  exports.replaceDefine()
}
