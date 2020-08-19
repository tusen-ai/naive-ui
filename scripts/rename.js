const fs = require('fs')
const path = require('path')

async function * walk (dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name)
    if (d.isDirectory()) yield * walk(entry)
    else if (d.isFile()) yield entry
  }
}

// Then, use it with a simple async for loop
async function main () {
  for await (const p of walk('./demo/documentation')) {
    // console.log(p)
    // if (/index\.md$/.test(p)) {
    //   // console.log(p.replace(/index\.md$/, 'index.demo-entry.md'))
    //   fs.renameSync(p, p.replace(/index\.md$/, 'index.demo-entry.md'))
    // }
    if (/\.md$/.test(p) && !/demo-entry\.md$/.test(p)) {
      fs.renameSync(p, p.replace(/\.md$/, '.demo.md'))
    }
  }
}

main()
