import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
/**
 * @vitest-environment node
 */
import { createSSRApp, h } from 'vue'
import { NSplit } from '../..'

describe('server side rendering', () => {
  it('works', async () => {
    const app = createSSRApp(() => (
      <NSplit>
        {{
          1: () => 'Left',
          2: () => 'Right'
        }}
      </NSplit>
    ))
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with vertical direction', async () => {
    const app = createSSRApp(() => (
      <NSplit direction="vertical">
        {{
          1: () => 'Top',
          2: () => 'Bottom'
        }}
      </NSplit>
    ))
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with disabled prop', async () => {
    const app = createSSRApp(() => (
      <NSplit disabled>
        {{
          1: () => 'Left',
          2: () => 'Right'
        }}
      </NSplit>
    ))
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})
