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
      <NSplit
        v-slots={{
          1: () => 'Pane 1',
          2: () => 'Pane 2'
        }}
      />
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
      <NSplit
        direction="vertical"
        v-slots={{
          1: () => 'Pane 1',
          2: () => 'Pane 2'
        }}
      />
    ))
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with custom size', async () => {
    const app = createSSRApp(() => (
      <NSplit
        size={0.3}
        v-slots={{
          1: () => 'Pane 1',
          2: () => 'Pane 2'
        }}
      />
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
