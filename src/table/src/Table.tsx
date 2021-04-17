import { defineComponent, computed, h, PropType, CSSProperties } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { tableLight } from '../styles'
import type { TableTheme } from '../styles'
import style from './styles/index.cssr'

const tableProps = {
  ...(useTheme.props as ThemeProps<TableTheme>),
  bordered: {
    type: Boolean,
    default: true
  },
  bottomBordered: {
    type: Boolean,
    default: true
  },
  singleLine: {
    type: Boolean,
    default: true
  },
  singleColumn: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  }
}

export type TableProps = ExtractPublicPropTypes<typeof tableProps>

export default defineComponent({
  name: 'Table',
  props: tableProps,
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Table',
      'Table',
      style,
      tableLight,
      props,
      mergedClsPrefix
    )
    return {
      cPrefix: mergedClsPrefix,
      cssVars: computed(() => {
        const { size } = props
        const {
          self: {
            borderColor,
            tdColor,
            tdColorModal,
            tdColorPopover,
            thColor,
            thColorModal,
            thColorPopover,
            thTextColor,
            tdTextColor,
            borderRadius,
            thFontWeight,
            lineHeight,
            borderColorModal,
            borderColorPopover,
            [createKey('fontSize', size)]: fontSize,
            [createKey('tdPadding', size)]: tdPadding,
            [createKey('thPadding', size)]: thPadding
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--td-color': tdColor,
          '--td-color-modal': tdColorModal,
          '--td-color-popover': tdColorPopover,
          '--td-text-color': tdTextColor,
          '--border-color': borderColor,
          '--border-color-modal': borderColorModal,
          '--border-color-popover': borderColorPopover,
          '--border-radius': borderRadius,
          '--font-size': fontSize,
          '--th-color': thColor,
          '--th-color-modal': thColorModal,
          '--th-color-popover': thColorPopover,
          '--th-font-weight': thFontWeight,
          '--th-text-color': thTextColor,
          '--line-height': lineHeight,
          '--td-padding': tdPadding,
          '--th-padding': thPadding
        }
      })
    }
  },
  render () {
    const { cPrefix } = this
    return (
      <table
        class={[
          `${cPrefix}-table`,
          {
            [`${cPrefix}-table--bottom-bordered`]: this.bottomBordered,
            [`${cPrefix}-table--bordered`]: this.bordered,
            [`${cPrefix}-table--single-line`]: this.singleLine,
            [`${cPrefix}-table--single-column`]: this.singleColumn
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </table>
    )
  }
})
