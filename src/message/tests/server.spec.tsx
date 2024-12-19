import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
/**
 * @jest-environment node
 */
import { createSSRApp, defineComponent, h } from 'vue'
import { NMessageProvider, useMessage } from '../..'

describe('sSR', () => {
  it('works', async () => {
    const Component = defineComponent({
      setup() {
        const message = useMessage()
        expect(message).toBeTruthy()
      },
      render() {
        return '07akioni'
      }
    })
    const app = createSSRApp(() => (
      <NMessageProvider>
        {{
          default: () => <Component />
        }}
      </NMessageProvider>
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
