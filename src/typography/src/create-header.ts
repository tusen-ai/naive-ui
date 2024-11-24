import { type PropType, computed, defineComponent, h } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { type ExtractPublicPropTypes, createKey } from '../../_utils'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/header.cssr'

export const headerProps = {
  ...(useTheme.props as ThemeProps<TypographyTheme>),
  type: {
    type: String as PropType<
      'info' | 'success' | 'warning' | 'error' | 'default'
    >,
    default: 'default'
  },
  prefix: String,
  alignText: Boolean
} as const

export type HeaderProps = ExtractPublicPropTypes<typeof headerProps>

export default (level: '1' | '2' | '3' | '4' | '5' | '6') =>
  defineComponent({
    name: `H${level}`,
    props: headerProps,
    setup(props) {
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
          '--n-bezier': cubicBezierEaseInOut,
          '--n-font-size': fontSize,
          '--n-margin': margin,
          '--n-bar-color': barColor,
          '--n-bar-width': barWidth,
          '--n-font-weight': headerFontWeight,
          '--n-text-color': headerTextColor,
          '--n-prefix-width': prefixWidth
        }
      })
      const themeClassHandle = inlineThemeDisabled
        ? useThemeClass(
          `h${level}`,
          computed(() => props.type[0]),
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
    render() {
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
