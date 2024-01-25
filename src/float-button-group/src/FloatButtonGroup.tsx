import { h, defineComponent, computed, type CSSProperties } from 'vue'
import type { Size } from '../../button/src/interface'
import { type ThemeProps, useConfig, useTheme } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/index.cssr'
import floatButtonGroupLight, {
  type FloatButtonGroupTheme
} from '../styles/light'
import { floatButtonProps } from '../../float-button/src/FloatButton'

export interface ButtonGroupInjection {
  size?: Size | undefined
}

export const floatButtonGroupProps = {
  ...(useTheme.props as ThemeProps<FloatButtonGroupTheme>),
  ...floatButtonProps,
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
