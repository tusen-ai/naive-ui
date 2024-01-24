import { h, defineComponent, type PropType, computed, mergeProps } from 'vue'
import {
  resolveSlot,
  type ExtractPublicPropTypes,
  formatLength,
  lockHtmlScrollRightCompensationRef
} from '../../_utils'
import useConfig from '../../_mixins/use-config'
import style from './styles/index.cssr'
import { type ThemeProps, useTheme } from '../../_mixins'
import { type FloatButtonTheme, floatButtonLight } from '../styles'
import { VLazyTeleport } from 'vueuc'
import { NBaseIcon } from '../../_internal'
import BackTopIcon from '../../back-top/src/BackTopIcon'

export const floatButtonProps = {
  ...(useTheme.props as ThemeProps<FloatButtonTheme>),
  to: {
    type: [String, Object] as PropType<HTMLElement | string>,
    default: 'body'
  },
  right: {
    type: [Number, String] as PropType<string | number>,
    default: 40
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
          iconColor,
          iconColorHover,
          iconColorPressed,
          width,
          height,
          iconSize,
          borderRadius,
          textColor
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
        '--n-icon-size': iconSize,
        '--n-icon-color': iconColor,
        '--n-icon-color-hover': iconColorHover,
        '--n-icon-color-pressed': iconColorPressed,
        '--n-text-color': textColor
      }
    })

    const styleRef = computed(
      (): {
        right: string
        bottom: string
      } => {
        return {
          right: `calc(${formatLength(props.right)} + ${
            lockHtmlScrollRightCompensationRef.value
          })`,
          bottom: formatLength(props.bottom)
        }
      }
    )

    return {
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      mergedClsPrefix: mergedClsPrefixRef,
      style: styleRef
    }
  },

  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        ref="placeholderRef"
        class={`${mergedClsPrefix}-float-button-placeholder`}
        style="display: none"
        aria-hidden
      >
        <VLazyTeleport to={this.to} show>
          {{
            default: () =>
              h(
                'div',
                mergeProps(this.$attrs, {
                  class: [`${mergedClsPrefix}-float-button`],
                  style: [this.style, this.cssVars]
                }),
                resolveSlot(this.$slots.default, () => [
                  <NBaseIcon clsPrefix={mergedClsPrefix}>
                    {{ default: () => BackTopIcon }}
                  </NBaseIcon>
                ])
              )
          }}
        </VLazyTeleport>
      </div>
    )
  }
})
