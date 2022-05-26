import {
  defineComponent,
  watchEffect,
  onBeforeMount,
  onUnmounted,
  inject
} from 'vue'
import { merge } from 'lodash-es'
import { warn } from '../../_utils'
import { commonLight } from '../../_styles/common'
import { configProviderInjectionKey } from '../../config-provider/src/context'

export default defineComponent({
  name: 'GlobalStyle',
  setup () {
    if (typeof document === 'undefined') return // TODO: inject style for SSR
    const NConfigProvider = inject(configProviderInjectionKey, null)
    const { body } = document
    const { style } = body
    let styleApplied = false
    let firstApply = true
    onBeforeMount(() => {
      watchEffect(() => {
        const {
          textColor2,
          fontSize,
          fontFamily,
          bodyColor,
          cubicBezierEaseInOut,
          lineHeight
        } = NConfigProvider
          ? merge(
            {},
            NConfigProvider.mergedThemeRef.value?.common || commonLight,
            NConfigProvider.mergedThemeOverridesRef.value?.common
          )
          : commonLight
        if (styleApplied || !body.hasAttribute('n-styled')) {
          style.setProperty('-webkit-text-size-adjust', '100%')
          style.setProperty('-webkit-tap-highlight-color', 'transparent')
          style.padding = '0'
          style.margin = '0'
          style.backgroundColor = bodyColor
          style.color = textColor2
          style.fontSize = fontSize
          style.fontFamily = fontFamily
          style.lineHeight = lineHeight
          const transition = `color .3s ${cubicBezierEaseInOut}, background-color .3s ${cubicBezierEaseInOut}`
          if (firstApply) {
            setTimeout(() => {
              style.transition = transition
            }, 0)
          } else {
            style.transition = transition
          }
          body.setAttribute('n-styled', '')
          styleApplied = true
          firstApply = false
        } else if (__DEV__) {
          warn(
            'global-style',
            'More than one n-global-style exist in the document.body. Only the first mounted one will work.'
          )
        }
      })
    })
    onUnmounted(() => {
      if (styleApplied) {
        body.removeAttribute('n-styled')
      }
    })
  },
  render () {
    return null
  }
})
