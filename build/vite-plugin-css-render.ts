import type { Plugin } from 'vite'
import { terseCssr } from './utils/terse-cssr'

export function cssRenderPlugin(): Plugin {
  return {
    name: 'css-render-vite',
    transform(src: string, id: string) {
      if (id.endsWith('.cssr.ts') || id.endsWith('.cssr.js')) {
        return terseCssr(src)
      }
    }
  }
}
