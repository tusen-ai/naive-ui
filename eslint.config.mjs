import antfu from '@antfu/eslint-config'

export default antfu(
  {
    regexp: false,
    ignores: [
      'node_modules',
      'lib',
      'test/unit/coverage',
      'src/_deprecated/icons',
      'dist',
      'es'
    ]
  },
  {
    files: ['**/*.demo.vue'],
    rules: {
      'no-console': 'off',
      'vue/one-component-per-file': 'off'
    }
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'unused-imports/no-unused-imports': 'off'
    }
  },
  {
    files: ['**/*'],
    rules: {
      'style/multiline-ternary': 'off',
      'style/max-statements-per-line': 'off',
      'style/comma-dangle': 'off',
      'style/quote-props': 'off',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/check-param-names': 'off'
    }
  }
)
