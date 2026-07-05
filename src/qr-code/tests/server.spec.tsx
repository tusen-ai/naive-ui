import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
/**
 * @vitest-environment node
 */
import { createSSRApp, h } from 'vue'
import { NQrCode } from '../..'

describe('server side rendering', () => {
  it('works', async () => {
    const app = createSSRApp(() => <NQrCode value="https://example.com" />)
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with custom size', async () => {
    const app = createSSRApp(() => <NQrCode value="test" size={200} />)
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with custom colors', async () => {
    const app = createSSRApp(() => (
      <NQrCode
        value="test"
        color="#ff0000"
        backgroundColor="#ffff00"
      />
    ))
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with svg type', async () => {
    const app = createSSRApp(() => <NQrCode value="test" type="svg" />)
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with icon', async () => {
    const app = createSSRApp(() => (
      <NQrCode
        value="test"
        iconSrc="https://example.com/icon.png"
        iconSize={50}
      />
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
