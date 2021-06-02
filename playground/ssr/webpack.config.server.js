module.exports = {
  mode: 'development',
  externalsPresets: { node: true },
  externals: [/^[@/a-z\-0-9]+$/],
  target: 'node',
  entry: './server.js',
  output: {
    filename: 'server.js',
    library: {
      type: 'commonjs2'
    }
  }
}
