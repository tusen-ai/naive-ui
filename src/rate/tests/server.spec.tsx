import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'
import { NRate } from '../..'

describe('sSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => <NRate />)
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})
