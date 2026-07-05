import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
/**
 * @vitest-environment node
 */
import { createSSRApp, h } from 'vue'
import { NGuide } from '../..'

describe('server side rendering', () => {
  it('works', async () => {
    const app = createSSRApp(() => (
      <NGuide
        show
        steps={[
          {
            title: 'SSR',
            content: 'No DOM access on server.'
          }
        ]}
      />
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
