<template>
  <table
    class="n-table"
    :class="{
      'n-table--bordered': bordered,
      'n-table--single-line': singleLine,
      'n-table--single-column': singleColumn
    }"
    :style="cssVars"
  >
    <slot />
  </table>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useTheme } from '../../_mixins'
import { createKey } from '../../_utils'
import { tableLight } from '../styles'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Table',
  props: {
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
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
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
  }
})
</script>
