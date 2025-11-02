import type { Plugin } from 'vite'
import { env } from 'node:process'

function transformIndexHtml(code: string): string {
  switch (env.NODE_ENV) {
    case 'production':
      return code.replace(/__INDEX__/, 'demo/index.prod.js')
    default:
      return code.replace(/__INDEX__/, 'demo/index.dev.js')
  }
}

export const demoIndexTransFormPlugin: Plugin = {
  name: 'demo-transform',
  transformIndexHtml: {
    order: 'pre',
    handler: (code: string) => {
      return transformIndexHtml(code)
    }
  }
}
