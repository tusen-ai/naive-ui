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
    ],
    'vue/no-template-key': 0,
    'vue/valid-template-root': 0,
    'vue/valid-v-model': 0
  },
  overrides: [
    {
      files: '*.spec.js',
      globals: {
        describe: 'readonly',
        it: 'readonly'
      }
    },
    {
      files: '*',
      globals: {
        __DEV__: 'readonly'
      }
    }
  ]
}
