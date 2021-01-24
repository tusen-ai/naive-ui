import { defineComponent, computed, h, PropType, CSSProperties } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils'
import { tableLight } from '../styles'
import type { TableTheme } from '../styles'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'Table',
  props: {
    ...(useTheme.props as ThemeProps<TableTheme>),
    bordered: {
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
  },
  setup (props) {
    const themeRef = useTheme('Table', 'Table', style, tableLight, props)
    return {
      cssVars: computed(() => {
        const { size } = props
        const {
          self: {
            borderColor,
            bodyColor,
            bodyColorModal,
            thColor,
            thTextColor,
            tdTextColor,
            borderRadius,
            tdFontWeight,
            lineHeight,
            [createKey('fontSize', size)]: fontSize,
            [createKey('tdPadding', size)]: tdPadding,
            [createKey('thPadding', size)]: thPadding
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--td-color': bodyColor,
          '--td-color-modal': bodyColorModal,
          '--td-text-color': tdTextColor,
          '--border-color': borderColor,
          '--border-radius': borderRadius,
          '--font-size': fontSize,
          '--th-color': thColor,
          '--th-font-weight': tdFontWeight,
          '--th-text-color': thTextColor,
          '--line-height': lineHeight,
          '--td-padding': tdPadding,
          '--th-padding': thPadding
        }
      })
    }
  },
  render () {
    return (
      <table
        class={[
          'n-table',
          {
            'n-table--bordered': this.bordered,
            'n-table--single-line': this.singleLine,
            'n-table--single-column': this.singleColumn
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </table>
    )
  }
})
