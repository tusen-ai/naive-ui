import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
/**
 * @jest-environment node
 */
import { createSSRApp, h } from 'vue'
import { NGrid, NGridItem } from '../..'

describe('sSR', () => {
  it('works 1', async () => {
    const app = createSSRApp(() => <NGrid />)
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
  it('works 2', async () => {
    const app = createSSRApp(() => (
      <NGrid>{{ default: () => <NGridItem /> }}</NGrid>
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
