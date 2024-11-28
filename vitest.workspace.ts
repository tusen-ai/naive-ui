import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    extends: 'vite.config.js',
    test: {
      name: 'server',
      environment: 'node',
      include: ['src/**/tests/server.spec.{ts,tsx}']
    }
  },
  {
    extends: 'vite.config.js',
    test: {
      name: 'browser',
      environment: 'jsdom',
      include: ['src/**/tests/{**,}.spec.{ts,tsx}'],
      exclude: ['src/**/tests/server.spec.{ts,tsx}']
    }
  }
])
