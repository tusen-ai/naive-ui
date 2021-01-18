import { h, defineComponent, computed, PropType } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { getSlot, createKey } from '../../_utils'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/header.cssr'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (level: '1' | '2' | '3' | '4' | '5' | '6') =>
  defineComponent({
    name: `H${level}`,
    props: {
      ...(useTheme.props as ThemeProps<TypographyTheme>),
      type: {
        type: String as PropType<
        'info' | 'success' | 'warning' | 'error' | 'default'
        >,
        default: 'default'
      },
      prefix: {
        type: String,
        default: undefined
      },
      alignText: {
        type: Boolean,
        default: false
      }
    },
    setup (props) {
      const themeRef = useTheme(
        'Typography',
        'H',
        style,
        typographyLight,
        props
      )
      return {
        cssVars: computed(() => {
          const { type } = props
          const {
            common: { cubicBezierEaseInOut },
            self: {
              headerFontWeight,
              headerTextColor,
              [createKey('headerPrefixWidth', level)]: prefixWidth,
              [createKey('headerFontSize', level)]: fontSize,
              [createKey('headerMargin', level)]: margin,
              [createKey('headerBarWidth', level)]: barWidth,
              [createKey('headerBarColor', type)]: barColor
            }
          } = themeRef.value
          return {
            '--bezier': cubicBezierEaseInOut,
            '--font-size': fontSize,
            '--margin': margin,
            '--bar-color': barColor,
            '--bar-width': barWidth,
            '--font-weight': headerFontWeight,
            '--text-color': headerTextColor,
            '--prefix-width': prefixWidth
          }
        })
      }
    },
    render () {
      const { prefix, alignText, cssVars } = this
      return h(
        `h${level}`,
        {
          class: [
            'n-h',
            `n-h${level}`,
            {
              'n-h--prefix-bar': prefix,
              'n-h--align-text': alignText
            }
          ],
          style: cssVars
        },
        getSlot(this)
      )
    }
  })
