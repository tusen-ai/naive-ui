/**
 * @jest-environment node
 */
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { setup } from '@css-render/vue3-ssr'
import { NCol, NRow } from '../..'

describe('sSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => (
      <NRow>
        {{
          default: () => <NCol />
        }}
      </NRow>
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
