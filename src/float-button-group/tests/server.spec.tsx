/**
 * @jest-environment node
 */
import { h, createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { setup } from '@css-render/vue3-ssr'
import { NFloatButtonGroup } from '../..'

describe('SSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => <NFloatButtonGroup />)
    setup(app)
    try {
      await renderToString(app)
    } catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})
