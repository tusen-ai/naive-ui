const packageJson = require('../../package.json')

delete packageJson.sideEffects

require('fs-extra').writeFileSync(
  require('path').resolve(__dirname, '..', 'package.json'),
  JSON.stringify(packageJson, 0, 2) + '\n'
)
