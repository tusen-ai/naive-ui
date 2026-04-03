import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
/**
 * @vitest-environment node
 */
import { createSSRApp, h } from 'vue'
import { NQrCode } from '../index'

describe('server side rendering', () => {
  it('works', async () => {
    const app = createSSRApp(() => <NQrCode value="https://naive-ui.com" />)
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})
