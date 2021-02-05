const packageJson = require('../../package.json')

packageJson.sideEffects = false

require('fs-extra').writeFileSync(
  require('path').resolve(__dirname, '..', '..', 'package.json'),
  JSON.stringify(packageJson, 0, 2) + '\n'
)
