<template>
  <div
    class="n-layout-footer"
    :class="{
      [`n-layout-footer--${position}-positioned`]: position,
      [`n-layout-footer--bordered`]: bordered
    }"
    :style="cssVars"
  >
    <slot />
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import layoutModeMixin from './layoutModeMixin'
import { useTheme } from '../../_mixins'
import { layoutLight } from '../styles'
import style from './styles/layout-footer.cssr.js'

export default defineComponent({
  name: 'LayoutFooter',
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
      'LayoutFooter',
      style,
      layoutLight,
      props
    )
    return {
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { footerBorderColor }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--footer-border-color': footerBorderColor
        }
      })
    }
  }
})
</script>
