// the file is used for jest testing & site building
// > 2%, make template string not compiled to concat, since it's not fast
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
