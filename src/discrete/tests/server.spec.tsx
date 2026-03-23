import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
/**
 * @vitest-environment node
 */
import { createSSRApp, h } from 'vue'
import { createDiscreteApi } from '../..'

describe('server side rendering', () => {
  it('works with message', () => {
    const result = createDiscreteApi(['message'])
    expect(result).toBeDefined()
    expect(result.app).toBeDefined()
  })

  it('works with notification', () => {
    const result = createDiscreteApi(['notification'])
    expect(result).toBeDefined()
    expect(result.app).toBeDefined()
  })

  it('works with dialog', () => {
    const result = createDiscreteApi(['dialog'])
    expect(result).toBeDefined()
    expect(result.app).toBeDefined()
  })

  it('works with loadingBar', () => {
    const result = createDiscreteApi(['loadingBar'])
    expect(result).toBeDefined()
    expect(result.app).toBeDefined()
  })

  it('works with modal', () => {
    const result = createDiscreteApi(['modal'])
    expect(result).toBeDefined()
    expect(result.app).toBeDefined()
  })

  it('works with multiple providers', () => {
    const result = createDiscreteApi([
      'message',
      'notification',
      'dialog',
      'loadingBar',
      'modal'
    ])
    expect(result).toBeDefined()
    expect(result.app).toBeDefined()
  })
})
