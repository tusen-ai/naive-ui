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
  striped: Boolean,
  singleColumn: Boolean,
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
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Table',
      'Table',
      style,
      tableLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
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
            tdColorStriped,
            tdColorStripedModal,
            tdColorStripedPopover,
            [createKey('fontSize', size)]: fontSize,
            [createKey('tdPadding', size)]: tdPadding,
            [createKey('thPadding', size)]: thPadding
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-td-color': tdColor,
          '--n-td-color-modal': tdColorModal,
          '--n-td-color-popover': tdColorPopover,
          '--n-td-text-color': tdTextColor,
          '--n-border-color': borderColor,
          '--n-border-color-modal': borderColorModal,
          '--n-border-color-popover': borderColorPopover,
          '--n-border-radius': borderRadius,
          '--n-font-size': fontSize,
          '--n-th-color': thColor,
          '--n-th-color-modal': thColorModal,
          '--n-th-color-popover': thColorPopover,
          '--n-th-font-weight': thFontWeight,
          '--n-th-text-color': thTextColor,
          '--n-line-height': lineHeight,
          '--n-td-padding': tdPadding,
          '--n-th-padding': thPadding,
          '--n-td-color-striped': tdColorStriped,
          '--n-td-color-striped-modal': tdColorStripedModal,
          '--n-td-color-striped-popover': tdColorStripedPopover
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <table
        class={[
          `${mergedClsPrefix}-table`,
          {
            [`${mergedClsPrefix}-table--bottom-bordered`]: this.bottomBordered,
            [`${mergedClsPrefix}-table--bordered`]: this.bordered,
            [`${mergedClsPrefix}-table--single-line`]: this.singleLine,
            [`${mergedClsPrefix}-table--single-column`]: this.singleColumn,
            [`${mergedClsPrefix}-table--striped`]: this.striped
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </table>
    )
  }
})
