import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { InputTheme } from '../styles'
import type { Size } from './interface'
import { computed, defineComponent, h, type PropType } from 'vue'
import { useConfig, useFormItem, useTheme, useThemeClass } from '../../_mixins'
import { createKey } from '../../_utils'
import { inputLight } from '../styles'
import style from './styles/input-group-label.cssr'

export const inputGroupLabelProps = {
  ...(useTheme.props as ThemeProps<InputTheme>),
  // size: {
  //   type: String as PropType<Size | undefined>,
  //   default: undefined
  // },
  size: String as PropType<Size>,
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
    // form-item
    const formItem = useFormItem(props) // medium 默认值， 思路：让他受外部包裹的 form-item 的 size 控制？如何实现？
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
