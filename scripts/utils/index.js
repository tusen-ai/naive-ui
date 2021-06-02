const fs = require('fs').promises
const path = require('path')

exports.walk = async function * walk (dir) {
  for await (const d of await fs.opendir(dir)) {
    const entry = path.join(dir, d.name)
    if (d.isDirectory()) yield * walk(entry)
    else if (d.isFile()) yield entry
  }
}

exports.outDirs = ['es', 'lib'].map((d) => path.resolve(__dirname, '../..', d))
exports.srcDir = path.resolve(__dirname, '../../src')

exports.replaceDefine = require('./replace-define').replaceDefine
