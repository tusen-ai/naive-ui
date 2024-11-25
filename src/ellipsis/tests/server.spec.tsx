import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
/**
 * @jest-environment node
 */
import { createSSRApp, h } from 'vue'
import { NEllipsis } from '../..'

describe('sSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => (
      <NEllipsis>
        {{
          trigger: () => 'kirby'
        }}
      </NEllipsis>
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
