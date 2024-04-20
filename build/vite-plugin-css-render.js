import { terseCssr } from './utils/terse-cssr'

export const createCssrPlugin = () => {
  return {
    name: 'css-render-vite',
    transform (src, id) {
      if (id.endsWith('.cssr.ts') || id.endsWith('.cssr.js')) {
        return terseCssr(src)
      }
    }
  }
}
