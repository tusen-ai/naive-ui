import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'
import { NTime } from '../..'

describe('sSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => <NTime />)
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})
