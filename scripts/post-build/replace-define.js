const fs = require('fs').promises
const { walk, outDirs } = require('../utils')

const define = {
  __DEV__: "process.env.NODE_ENV !== 'production'"
}

exports.replaceDefine = async () => {
  const defineKeys = Object.keys(define)
  const patterns = {}
  defineKeys.forEach((key) => {
    patterns[key] = new RegExp(key, 'g')
  })
  for (const dir of outDirs) {
    for await (const p of walk(dir)) {
      const code = await fs.readFile(p, 'utf-8')
      for (const key of defineKeys) {
        const pattern = patterns[key]
        if (pattern.test(code)) {
          const outCode = code.replace(pattern, define[key])
          await fs.writeFile(p, outCode)
        }
      }
    }
  }
}

if (require.main === module) {
  exports.replaceDefine()
}
