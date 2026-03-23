import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
/**
 * @vitest-environment node
 */
import { createSSRApp, h } from 'vue'
import { NSplit } from '../..'

describe('server side rendering', () => {
  it('works', async () => {
    const app = createSSRApp(() => <NSplit />)
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with slots', async () => {
    const app = createSSRApp(() => (
      <NSplit>
        {{
          1: () => <div>Pane 1</div>,
          2: () => <div>Pane 2</div>
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
    const app = createSSRApp(() => <NSplit direction="vertical" />)
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with disabled prop', async () => {
    const app = createSSRApp(() => <NSplit disabled />)
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})
