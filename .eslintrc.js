module.exports = {
  extends: ['plugin:markdown/recommended'],
  overrides: [
    {
      files: ['*.vue', '*.js'],
      extends: [
        'plugin:vue/essential',
        '@vue/standard'
        // '@vue/typescript/recommended'
      ],
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
        'vue/no-v-model-argument': 0
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['standard-with-typescript'],
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        '@typescript-eslint/strict-boolean-expressions': 0,
        '@typescript-eslint/prefer-nullish-coalescing': 0,
        '@typescript-eslint/naming-convention': 0,
        'multiline-ternary': 0,
        'no-void': 0
      }
    },
    {
      files: ['light.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/explicit-function-return-type': 0
      }
    },
    {
      files: '**/*.md/*.js',
      rules: {
        'no-undef': 0
      }
    },
    {
      files: '*.spec.ts',
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly'
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 0
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
