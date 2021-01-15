const version = require('../package.json').version

require('fs').writeFileSync(
  require('path').resolve(__dirname, '..', 'src', 'version.ts'),
  `export default '${version}'\n`
)
