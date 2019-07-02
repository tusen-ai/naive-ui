module.exports = {
  'plugins': ['transform-vue-jsx'],
  'presets': ['@babel/preset-env'],
  env: {
    test: {
      plugins: ['istanbul']
    }
  }
}
