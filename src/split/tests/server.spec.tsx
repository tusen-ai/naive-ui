import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
/**
 * @vitest-environment node
 */
import { createSSRApp, h } from 'vue'
import { NSplit } from '../index'

describe('server side rendering', () => {
  it('works', async () => {
    const app = createSSRApp(() => (
      <NSplit>
        {{
          1: () => h('div', 'pane 1'),
          2: () => h('div', 'pane 2')
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
