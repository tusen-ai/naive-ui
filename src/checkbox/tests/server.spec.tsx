import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'
import { NCheckbox } from '../..'

describe('sSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => <NCheckbox />)
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})
