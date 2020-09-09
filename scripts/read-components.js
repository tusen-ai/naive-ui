const fs = require('fs').promises
const path = require('path')

;(async () => {
  const files = await fs.readdir(
    path.resolve(__dirname, '..', 'src')
  )
  files.forEach(file => {
    if (!file.startsWith('_')) console.log(`- [ ] ${file}`)
  })
})()
