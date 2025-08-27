import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { DividerTheme } from '../styles'
import {
  computed,
  type CSSProperties,
  defineComponent,
  Fragment,
  h,
  type PropType
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import { dividerLight } from '../styles'
import style from './styles/index.cssr'

export const dividerProps = {
  ...(useTheme.props as ThemeProps<DividerTheme>),
  type: {
    type: String as PropType<'solid' | 'dashed' | 'dotted'>,
    default: 'solid'
  },
  titlePlacement: {
    type: String as PropType<'before' | 'center' | 'after' | 'left' | 'right'>,
    default: 'center'
  },
  offset: {
    type: Number,
    default: 28
  },
  titleClass: String,
  titleStyle: [Object, String] as PropType<string | Record<string, any>>,
  vertical: Boolean
} as const

export type DividerProps = ExtractPublicPropTypes<typeof dividerProps>

export default defineComponent({
  name: 'Divider',
  props: dividerProps,
  setup(props) {
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
        self: {
          color,
          textColor,
          fontWeight,
          borderWidth,
          fontSize,
          margin,
          verticalMargin
        }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-color': color,
        '--n-text-color': textColor,
        '--n-font-size': fontSize,
        '--n-font-weight': fontWeight,
        '--n-border-width': borderWidth,
        '--n-margin': margin,
        '--n-vertical-margin': verticalMargin,
        '--n-offset': `${props.offset || 0}px`
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
  render() {
    const {
      $slots,
      titlePlacement,
      vertical,
      type,
      cssVars,
      mergedClsPrefix,
      titleClass,
      titleStyle
    } = this

    const placement
      = titlePlacement === 'left'
        ? 'before'
        : titlePlacement === 'right'
          ? 'after'
          : titlePlacement

    this.onRender?.()
    return (
      <div
        role="separator"
        class={[
          `${mergedClsPrefix}-divider`,
          this.themeClass,
          {
            [`${mergedClsPrefix}-divider--vertical`]: vertical,
            [`${mergedClsPrefix}-divider--${type}`]: type,
            [`${mergedClsPrefix}-divider--title-position-${placement}`]:
              $slots.default && placement
          }
        ]}
        style={cssVars as CSSProperties}
      >
        <div
          class={`${mergedClsPrefix}-divider__line ${mergedClsPrefix}-divider__line--before`}
        />
        {$slots.default ? (
          <>
            <div
              class={[`${mergedClsPrefix}-divider__title`, titleClass]}
              style={titleStyle}
            >
              {this.$slots}
            </div>
            <div
              class={`${mergedClsPrefix}-divider__line ${mergedClsPrefix}-divider__line--after`}
            />
          </>
        ) : null}
      </div>
    )
  }
})
