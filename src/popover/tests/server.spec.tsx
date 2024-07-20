/**
 * @jest-environment node
 */
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { setup } from '@css-render/vue3-ssr'
import { NPopover } from '../..'

describe('sSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => (
      <NPopover>
        {{
          trigger: () => 'kirby'
        }}
      </NPopover>
    ))
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      console.error(e)
      expect(e).not.toBeTruthy()
    }
  })
})
