module.exports = {
  extends: ['plugin:vue/recommended', '@vue/standard'],
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
  parser: "babel-eslint",
}
