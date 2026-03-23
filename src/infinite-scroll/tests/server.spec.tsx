import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
/**
 * @vitest-environment node
 */
import { createSSRApp, h } from 'vue'
import { NInfiniteScroll } from '../..'

describe('server side rendering', () => {
  it('works', async () => {
    const app = createSSRApp(() => (
      <NInfiniteScroll>
        {{
          default: () => ['Item 1', 'Item 2', 'Item 3']
        }}
      </NInfiniteScroll>
    ))
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with distance prop', async () => {
    const app = createSSRApp(() => (
      <NInfiniteScroll distance={100}>
        {{
          default: () => ['Item 1', 'Item 2']
        }}
      </NInfiniteScroll>
    ))
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with scrollbarProps', async () => {
    const app = createSSRApp(() => (
      <NInfiniteScroll scrollbarProps={{ style: { height: '300px' } }}>
        {{
          default: () => ['Item 1']
        }}
      </NInfiniteScroll>
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
