// the file is used for site building and other tooling builds
// > 2%, make template string not compiled to concat, since it's not fast
const process = require('node:process')

module.exports = {
  presets:
    process.env.NODE_ENV === 'test'
      ? [['@babel/preset-env', { targets: { node: 'current' } }]]
      : [
          [
            '@babel/preset-env',
            {
              targets: '>2%, not IE 11'
            }
          ]
        ]
}
