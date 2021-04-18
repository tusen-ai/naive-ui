import { computed, defineComponent, renderSlot, h, PropType } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { inputLight } from '../styles'
import type { InputTheme } from '../styles'
import style from './styles/input-group-label.cssr'
import type { Size } from './interface'

const inputGroupLabelProps = {
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
  setup (props) {
    const { mergedBordered, mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Input',
      'InputGroupLabel',
      style,
      inputLight,
      props,
      mergedClsPrefix
    )
    return {
      mergedClsPrefix,
      mergedBordered,
      cssVars: computed(() => {
        const { size } = props
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
          '--bezier': cubicBezierEaseInOut,
          '--group-label-color': groupLabelColor,
          '--group-label-border': groupLabelBorder,
          '--border-radius': borderRadius,
          '--group-label-text-color': groupLabelTextColor,
          '--font-size': fontSize,
          '--line-height': lineHeight,
          '--height': height
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        class={`${mergedClsPrefix}-input-group-label`}
        style={this.cssVars as any}
      >
        {renderSlot(this.$slots, 'default')}
        {this.mergedBordered ? (
          <div class={`${mergedClsPrefix}-input-group-label__border`} />
        ) : null}
      </div>
    )
  }
})
