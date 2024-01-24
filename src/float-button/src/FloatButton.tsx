import {
  h,
  defineComponent,
  type PropType,
  computed,
  type CSSProperties
} from 'vue'
import { type ExtractPublicPropTypes } from '../../_utils'
import useConfig from '../../_mixins/use-config'
import style from './styles/index.cssr'
import { type ThemeProps, useTheme } from '../../_mixins'
import { type FloatButtonTheme, floatButtonLight } from '../styles'

export const floatButtonProps = {
  ...(useTheme.props as ThemeProps<FloatButtonTheme>),
  left: {
    type: [Number, String] as PropType<string | number>,
    default: undefined
  },
  right: {
    type: [Number, String] as PropType<string | number>,
    default: 40
  },
  top: {
    type: [Number, String] as PropType<string | number>,
    default: undefined
  },
  bottom: {
    type: [Number, String] as PropType<string | number>,
    default: 40
  }
} as const

export type FloatButtonProps = ExtractPublicPropTypes<typeof floatButtonProps>

export default defineComponent({
  name: 'FloatButton',
  props: floatButtonProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)

    const themeRef = useTheme(
      'FloatButton',
      '-float-button',
      style,
      floatButtonLight,
      props,
      mergedClsPrefixRef
    )

    const cssVarsRef = computed(() => {
      const {
        self: {
          color,
          boxShadow,
          boxShadowHover,
          boxShadowPressed,
          width,
          height,
          borderRadius
        },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-border-radius': borderRadius,
        '--n-height': height,
        '--n-width': width,
        '--n-box-shadow': boxShadow,
        '--n-box-shadow-hover': boxShadowHover,
        '--n-box-shadow-pressed': boxShadowPressed,
        '--n-color': color,
        left: formatNumber(props.left),
        right: formatNumber(props.right),
        top: formatNumber(props.top),
        bottom: formatNumber(props.bottom)
      }
    })

    const formatNumber = (
      value: number | string | undefined
    ): string | undefined => {
      if (typeof value === 'number') return `${value}px`
      return value
    }

    return {
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      mergedClsPrefix: mergedClsPrefixRef,
      formatNumber
    }
  },

  render () {
    const { mergedClsPrefix, cssVars, $slots } = this

    return (
      <div
        class={`${mergedClsPrefix}-float-button`}
        style={cssVars as CSSProperties}
      >
        {$slots.default?.()}
      </div>
    )
  }
})
