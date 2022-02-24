import { h, defineComponent, computed, PropType } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { color2Class, createKey, ExtractPublicPropTypes } from '../../_utils'
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
  alignText: Boolean,
  color: String
} as const

export type HeaderProps = ExtractPublicPropTypes<typeof headerProps>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (level: '1' | '2' | '3' | '4' | '5' | '6') =>
  defineComponent({
    name: `H${level}`,
    props: headerProps,
    setup (props) {
      const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
      const themeRef = useTheme(
        'Typography',
        '-h',
        style,
        typographyLight,
        props,
        mergedClsPrefixRef
      )
      const cssVarsRef = computed(() => {
        const { type, color } = props
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
          '--n-bezier': cubicBezierEaseInOut,
          '--n-font-size': fontSize,
          '--n-margin': margin,
          '--n-bar-color': barColor,
          '--n-bar-width': barWidth,
          '--n-font-weight': headerFontWeight,
          '--n-text-color': color || headerTextColor,
          '--n-prefix-width': prefixWidth
        }
      })
      const themeClassHandle = inlineThemeDisabled
        ? useThemeClass(
            `h${level}`,
            computed(() => {
              let hash = props.type[0]
              const { color } = props

              if (color) hash += 'a' + color2Class(color)

              return hash
            }),
            cssVarsRef,
            props
        )
        : undefined
      return {
        mergedClsPrefix: mergedClsPrefixRef,
        cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
        themeClass: themeClassHandle?.themeClass,
        onRender: themeClassHandle?.onRender
      }
    },
    render () {
      const { prefix, alignText, mergedClsPrefix, cssVars, $slots } = this
      this.onRender?.()
      return h(
        `h${level}`,
        {
          class: [
            `${mergedClsPrefix}-h`,
            `${mergedClsPrefix}-h${level}`,
            this.themeClass,
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
