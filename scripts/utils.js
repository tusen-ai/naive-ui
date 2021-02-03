const fs = require('fs')
const path = require('path')

exports.walk = async function * walk (dir) {
  for await (const d of await fs.opendir(dir)) {
    const entry = path.join(dir, d.name)
    if (d.isDirectory()) yield * walk(entry)
    else if (d.isFile()) yield entry
  }
}
