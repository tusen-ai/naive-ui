module.exports = {
  extends: [
    'plugin:vue/recommended',
    '@vue/standard',
    'plugin:markdown/recommended'
  ],
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
    'vue/no-multiple-template-root': 0,
    'vue/no-lone-template': 0,
    'vue/no-v-model-argument': 0,
    'no-void': 0
  },
  overrides: [
    {
      files: '**/*.md/*.js',
      rules: {
        'no-undef': 0
      }
    },
    {
      files: '*.spec.js',
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly'
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
