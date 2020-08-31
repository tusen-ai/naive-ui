<template>
  <div
    class="n-layout-footer"
    :class="{
      [`n-layout-footer--${position}-positioned`]: position,
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      [`n-layout-footer--bordered`]: bordered
    }"
    :style="syntheticStyle"
  >
    <slot />
  </div>
</template>

<script>
import layoutModeMixin from './layoutModeMixin'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'LayoutFooter',
  mixins: [ withapp, themeable, layoutModeMixin ],
  props: {
    bordered: {
      type: Boolean,
      default: false
    }
  }
}
</script>
