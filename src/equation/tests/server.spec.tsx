import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
/**
 * @vitest-environment node
 */
import { createSSRApp, h, provide, ref } from 'vue'
import { configProviderInjectionKey } from '../../config-provider/src/context'
import { NEquation } from '../..'

const mockKatex = {
  renderToString: (content: string, options?: any) => {
    return `<span class="katex"><span class="katex-html">${content}</span></span>`
  }
}

describe('server side rendering', () => {
  it('works', async () => {
    const app = createSSRApp(() => <NEquation value="E = mc^2" katex={mockKatex} />)
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works without katex', async () => {
    const app = createSSRApp(() => <NEquation value="E = mc^2" />)
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with config provider injection', async () => {
    const app = createSSRApp({
      setup() {
        provide(configProviderInjectionKey, {
          mergedThemeRef: ref(null),
          mergedLocaleRef: ref(null),
          mergedDateLocaleRef: ref(null),
          mergedClsPrefixRef: ref('n'),
          mergedColorRef: ref(null),
          mergedFontSizeRef: ref(null),
          mergedFontFamilyRef: ref(null),
          mergedBorderedRef: ref(null),
          mergedSizeRef: ref(null),
          mergedDisabledRef: ref(null),
          mergedRoundRef: ref(null),
          mergedPaginationBehaviorRef: ref(null),
          mergedKatexRef: ref(mockKatex),
          mergedHljsRef: ref(null),
          mergedCodePropsRef: ref({}),
          mergedLoadingBarPropsRef: ref({}),
          mergedMessagePropsRef: ref({}),
          mergedDialogPropsRef: ref({}),
          mergedNotificationPropsRef: ref({}),
          mergedRtlRef: ref(null),
          mergedComponentPropsRef: ref({}),
          mergedBreakpointRef: ref(null),
          namespaceRef: ref('')
        })
        return () => <NEquation value="E = mc^2" />
      }
    })
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with complex equation', async () => {
    const app = createSSRApp(() => (
      <NEquation
        value="\\frac{\\partial u}{\\partial t} = \\alpha \\nabla^2 u"
        katex={mockKatex}
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

  it('works with katex options', async () => {
    const app = createSSRApp(() => (
      <NEquation
        value="E = mc^2"
        katex={mockKatex}
        katexOptions={{ displayMode: true }}
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
