import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
/**
 * @jest-environment node
 */
import { createSSRApp, h } from 'vue'
import { NTooltip } from '../..'

describe('sSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => (
      <NTooltip>
        {{
          trigger: () => 'kirby'
        }}
      </NTooltip>
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
