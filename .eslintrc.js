module.exports = {
  extends: ['plugin:vue/recommended', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 20,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ]
  },
  overrides: [
    {
      files: 'src/_icons/**/*',
      rules: {}
    }
  ]
}
