<template>
  <div
    class="n-layout-header"
    :class="{
      [`n-layout-header--${position}-positioned`]: position,
      [`n-layout-header--bordered`]: bordered
    }"
    :style="cssVars"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useTheme } from '../../_mixins'
import layoutModeMixin from './layoutModeMixin'
import { layoutLight } from '../styles'
import style from './styles/layout-header.cssr.js'

export default defineComponent({
  name: 'LayoutHeader',
  mixins: [layoutModeMixin],
  props: {
    ...useTheme.props,
    bordered: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Layout',
      'LayoutHeader',
      style,
      layoutLight,
      props
    )
    return {
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { headerColor, headerBorderColor }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--header-color': headerColor,
          '--header-border-color': headerBorderColor
        }
      })
    }
  }
})
</script>
