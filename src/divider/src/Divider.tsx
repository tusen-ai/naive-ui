import {
  h,
  computed,
  defineComponent,
  type CSSProperties,
  type PropType,
  Fragment
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { dividerLight } from '../styles'
import type { DividerTheme } from '../styles'
import style from './styles/index.cssr'

export const dividerProps = {
  ...(useTheme.props as ThemeProps<DividerTheme>),
  titlePlacement: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center'
  },
  dashed: Boolean,
  vertical: Boolean
} as const

export type DividerProps = ExtractPublicPropTypes<typeof dividerProps>

export default defineComponent({
  name: 'Divider',
  props: dividerProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Divider',
      '-divider',
      style,
      dividerLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: { color, textColor, fontWeight }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-color': color,
        '--n-text-color': textColor,
        '--n-font-weight': fontWeight
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('divider', undefined, cssVarsRef, props)
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      $slots,
      titlePlacement,
      vertical,
      dashed,
      cssVars,
      mergedClsPrefix
    } = this
    this.onRender?.()
    return (
      <div
        role="separator"
        class={[
          `${mergedClsPrefix}-divider`,
          this.themeClass,
          {
            [`${mergedClsPrefix}-divider--vertical`]: vertical,
            [`${mergedClsPrefix}-divider--no-title`]: !$slots.default,
            [`${mergedClsPrefix}-divider--dashed`]: dashed,
            [`${mergedClsPrefix}-divider--title-position-${titlePlacement}`]:
              $slots.default && titlePlacement
          }
        ]}
        style={cssVars as CSSProperties}
      >
        {!vertical ? (
          <div
            class={`${mergedClsPrefix}-divider__line ${mergedClsPrefix}-divider__line--left`}
          />
        ) : null}
        {!vertical && $slots.default ? (
          <>
            <div class={`${mergedClsPrefix}-divider__title`}>{this.$slots}</div>
            <div
              class={`${mergedClsPrefix}-divider__line ${mergedClsPrefix}-divider__line--right`}
            />
          </>
        ) : null}
      </div>
    )
  }
})
