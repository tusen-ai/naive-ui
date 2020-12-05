// the file is used for jest testing & site building
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'defaults, not IE 11'
      }
    ]
  ]
}
