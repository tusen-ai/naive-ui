import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
/**
 * @vitest-environment node
 */
import { createSSRApp } from 'vue'
import { NQrCode } from '../..'

describe('server side rendering', () => {
  it('works', async () => {
    const app = createSSRApp(() => <NQrCode value="test" />)
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
        backgroundColor="#f0f0f0"
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

  it('works with different error correction levels', async () => {
    const levels = ['L', 'M', 'Q', 'H'] as const
    for (const level of levels) {
      const app = createSSRApp(() => (
        <NQrCode value="test" errorCorrectionLevel={level} />
      ))
      setup(app)
      try {
        await renderToString(app)
      }
      catch (e) {
        expect(e).not.toBeTruthy()
      }
    }
  })
})
