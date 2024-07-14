const version = require('../package.json').version

require('node:fs').writeFileSync(
  require('node:path').resolve(__dirname, '..', 'src', 'version.ts'),
  `export default '${version}'\n`
)
