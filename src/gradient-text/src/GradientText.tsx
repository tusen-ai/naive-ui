import { defineComponent, computed, h, type PropType } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, formatLength, useHoudini } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { gradientTextLight } from '../styles'
import type { GradientTextTheme } from '../styles'
import style from './styles/index.cssr'

type Gradient =
  | string
  | {
    deg?: string | number
    from: string
    to: string
  }

export const gradientTextProps = {
  ...(useTheme.props as ThemeProps<GradientTextTheme>),
  size: [String, Number] as PropType<string | number>,
  fontSize: [String, Number] as PropType<string | number>,
  type: {
    type: String as PropType<
    'info' | 'success' | 'warning' | 'error' | 'primary' | 'danger'
    >,
    default: 'primary'
  },
  color: [Object, String] as PropType<Gradient>,
  gradient: [Object, String] as PropType<Gradient>
} as const

export type GradientTextProps = ExtractPublicPropTypes<typeof gradientTextProps>

export default defineComponent({
  name: 'GradientText',
  props: gradientTextProps,
  setup (props) {
    useHoudini()
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const compatibleTypeRef = computed<
    'info' | 'success' | 'warning' | 'error' | 'primary'
    >(() => {
      const { type } = props
      if (type === 'danger') return 'error'
      return type
    })
    const styleFontSizeRef = computed(() => {
      let fontSize = props.size || props.fontSize
      if (fontSize) fontSize = formatLength(fontSize)
      return fontSize || undefined
    })
    const styleBgImageRef = computed(() => {
      const gradient = props.color || props.gradient
      if (typeof gradient === 'string') {
        return gradient
      } else if (gradient) {
        const deg = gradient.deg || 0
        const from = gradient.from
        const to = gradient.to
        return `linear-gradient(${deg}deg, ${from} 0%, ${to} 100%)`
      }
      return undefined
    })
    const themeRef = useTheme(
      'GradientText',
      '-gradient-text',
      style,
      gradientTextLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { value: type } = compatibleTypeRef
      const {
        common: { cubicBezierEaseInOut },
        self: {
          rotate,
          [createKey('colorStart', type)]: colorStart,
          [createKey('colorEnd', type)]: colorEnd,
          fontWeight
        }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-rotate': rotate,
        '--n-color-start': colorStart,
        '--n-color-end': colorEnd,
        '--n-font-weight': fontWeight
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'gradient-text',
        computed(() => compatibleTypeRef.value[0]),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      compatibleType: compatibleTypeRef,
      styleFontSize: styleFontSizeRef,
      styleBgImage: styleBgImageRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix, onRender } = this
    onRender?.()
    return (
      <span
        class={[
          `${mergedClsPrefix}-gradient-text`,
          `${mergedClsPrefix}-gradient-text--${this.compatibleType}-type`,
          this.themeClass
        ]}
        style={[
          {
            fontSize: this.styleFontSize,
            backgroundImage: this.styleBgImage
          },
          this.cssVars as any
        ]}
      >
        {this.$slots}
      </span>
    )
  }
})
