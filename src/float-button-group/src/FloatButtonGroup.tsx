import {
  h,
  type PropType,
  defineComponent,
  computed,
  type CSSProperties
} from 'vue'
import type { Size } from '../../button/src/interface'
import { type ThemeProps, useConfig, useTheme } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/index.cssr'
import floatButtonGroupLight, {
  type FloatButtonGroupTheme
} from '../styles/light'

export interface ButtonGroupInjection {
  size?: Size | undefined
}

export const floatButtonGroupProps = {
  ...(useTheme.props as ThemeProps<FloatButtonGroupTheme>),
  width: {
    type: [Number, String] as PropType<string | number>,
    default: 'auto'
  },
  height: {
    type: [Number, String] as PropType<string | number>,
    default: 'auto'
  },
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
  },
  radius: {
    type: [Number, String] as PropType<string | number>,
    default: 22
  },
  backgroundColor: String,
  vertical: Boolean
} as const

export type FloatButtonGroupProps = ExtractPublicPropTypes<
  typeof floatButtonGroupProps
>

export default defineComponent({
  name: 'FloatButtonGroup',
  props: floatButtonGroupProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)

    const themeRef = useTheme(
      'FloatButtonGroup',
      '-float-button-group',
      style,
      floatButtonGroupLight,
      props,
      mergedClsPrefixRef
    )

    const cssVarsRef = computed(() => {
      const {
        self: { color, textColor, boxShadow, boxShadowHover, boxShadowPressed },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-box-shadow': boxShadow,
        '--n-box-shadow-hover': boxShadowHover,
        '--n-box-shadow-pressed': boxShadowPressed,
        '--n-color': color,
        '--n-text-color': textColor,
        left: formatNumber(props.left),
        right: formatNumber(props.right),
        top: formatNumber(props.top),
        bottom: formatNumber(props.bottom),
        width: formatNumber(props.width),
        height: formatNumber(props.height),
        borderRadius: formatNumber(props.radius),
        backgroundColor: props.backgroundColor
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
    const { mergedClsPrefix, cssVars } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-float-button-group`,
          this.vertical && `${mergedClsPrefix}-float-button-group--vertical`
        ]}
        style={cssVars as CSSProperties}
        role="group"
      >
        {this.$slots}
      </div>
    )
  }
})
