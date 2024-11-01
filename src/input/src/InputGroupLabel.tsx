import { type PropType, computed, defineComponent, h } from 'vue'
import { useConfig, useFormItem, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { inputLight } from '../styles'
import type { InputTheme } from '../styles'
import style from './styles/input-group-label.cssr'
import type { Size } from './interface'

export const inputGroupLabelProps = {
  ...(useTheme.props as ThemeProps<InputTheme>),
  size: {
    type: String as PropType<Size>,
    default: 'medium'
  },
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  }
} as const

export type InputGroupLabelProps = ExtractPublicPropTypes<
  typeof inputGroupLabelProps
>

export default defineComponent({
  name: 'InputGroupLabel',
  props: inputGroupLabelProps,
  setup(props) {
    const { mergedBorderedRef, mergedClsPrefixRef, inlineThemeDisabled }
      = useConfig(props)

    const formItem = useFormItem(props, {
      mergedSize(NFormItem) {
        if (NFormItem) {
          const { mergedSize } = NFormItem
          if (mergedSize.value !== undefined) {
            return mergedSize.value
          }
        }
        return props.size
      }
    })
    const { mergedSizeRef } = formItem

    const themeRef = useTheme(
      'Input',
      '-input-group-label',
      style,
      inputLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { value: size } = mergedSizeRef
      const {
        common: { cubicBezierEaseInOut },
        self: {
          groupLabelColor,
          borderRadius,
          groupLabelTextColor,
          lineHeight,
          groupLabelBorder,
          [createKey('fontSize', size)]: fontSize,
          [createKey('height', size)]: height
        }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-group-label-color': groupLabelColor,
        '--n-group-label-border': groupLabelBorder,
        '--n-border-radius': borderRadius,
        '--n-group-label-text-color': groupLabelTextColor,
        '--n-font-size': fontSize,
        '--n-line-height': lineHeight,
        '--n-height': height
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'input-group-label',
        computed(() => {
          const { value: size } = mergedSizeRef
          return size[0]
        }),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      mergedSize: mergedSizeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    const { mergedClsPrefix } = this
    this.onRender?.()
    return (
      <div
        class={[`${mergedClsPrefix}-input-group-label`, this.themeClass]}
        style={this.cssVars as any}
      >
        {this.$slots.default?.()}
        {this.mergedBordered ? (
          <div class={`${mergedClsPrefix}-input-group-label__border`} />
        ) : null}
      </div>
    )
  }
})
