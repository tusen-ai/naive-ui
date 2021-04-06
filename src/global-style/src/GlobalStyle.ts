import { defineComponent, watchEffect, onBeforeMount, onUnmounted } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { GlobalStyleTheme } from '../styles'
import { globalStyleLight } from '../styles'
import { warn } from '../../_utils'

export default defineComponent({
  name: 'GlobalStyle',
  props: {
    ...(useTheme.props as ThemeProps<GlobalStyleTheme>)
  },
  setup (props) {
    const themeRef = useTheme(
      'GlobalStyle',
      'GlobalStyle',
      undefined,
      globalStyleLight,
      props
    )
    const { body } = document
    const { style } = body
    let styleApplied = false
    onBeforeMount(() => {
      watchEffect(() => {
        const {
          value: {
            common: {
              textColor2,
              fontSize,
              fontFamily,
              bodyColor,
              cubicBezierEaseInOut,
              lineHeight
            }
          }
        } = themeRef
        if (styleApplied || !body.hasAttribute('n-styled')) {
          body.setAttribute('n-styled', '')
          styleApplied = true
          style.backgroundColor = bodyColor
          style.color = textColor2
          style.fontSize = fontSize
          style.fontFamily = fontFamily
          style.lineHeight = lineHeight
          style.transition = `color .3s ${cubicBezierEaseInOut}, background-color .3s ${cubicBezierEaseInOut}`
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
