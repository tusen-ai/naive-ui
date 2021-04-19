import { h, defineComponent, computed, PropType } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, ExtractPublicPropTypes } from '../../_utils'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/header.cssr'

const headerProps = {
  ...(useTheme.props as ThemeProps<TypographyTheme>),
  type: {
    type: String as PropType<
    'info' | 'success' | 'warning' | 'error' | 'default'
    >,
    default: 'default'
  },
  prefix: String,
  alignText: {
    type: Boolean,
    default: false
  }
} as const

export type HeaderProps = ExtractPublicPropTypes<typeof headerProps>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (level: '1' | '2' | '3' | '4' | '5' | '6') =>
  defineComponent({
    name: `H${level}`,
    props: headerProps,
    setup (props) {
      const { mergedClsPrefix } = useConfig(props)
      const themeRef = useTheme(
        'Typography',
        'H',
        style,
        typographyLight,
        props,
        mergedClsPrefix
      )
      return {
        mergedClsPrefix,
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
      const { prefix, alignText, mergedClsPrefix, cssVars, $slots } = this
      return h(
        `h${level}`,
        {
          class: [
            `${mergedClsPrefix}-h`,
            `${mergedClsPrefix}-h${level}`,
            {
              [`${mergedClsPrefix}-h--prefix-bar`]: prefix,
              [`${mergedClsPrefix}-h--align-text`]: alignText
            }
          ],
          style: cssVars
        },
        $slots
      )
    }
  })
