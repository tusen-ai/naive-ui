import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
/**
 * @jest-environment node
 */
import { createSSRApp, h } from 'vue'
import { NCode } from '../..'
import { NConfigProvider } from '../../config-provider'

hljs.registerLanguage('javascript', javascript)

describe('sSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => (
      <NConfigProvider hljs={hljs}>
        {{
          default: () => <NCode />
        }}
      </NConfigProvider>
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
