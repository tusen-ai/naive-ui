const fs = require('fs')
const path = require('path')

const tpl = fs.readFileSync(
  path.resolve(__dirname, 'deploy-doc.sh.tpl')
).toString()

const script = tpl.replace(/\$VERSION/g, require('../package.json').version)

fs.writeFileSync(
  path.resolve(__dirname, 'deploy-doc.sh'),
  script
)
