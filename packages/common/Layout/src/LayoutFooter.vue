<template>
  <div
    class="n-layout-footer"
    :class="{
      [`n-layout-footer--${mode}-positioned`]: mode,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      [`n-layout-footer--bordered`]: bordered
    }"
    :style="synthesizedStyle"
  >
    <slot />
  </div>
</template>

<script>
import layoutModeMixin from './layoutModeMixin'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asthemecontext from '../../../mixins/asthemecontext'

export default {
  name: 'NLayoutFooter',
  mixins: [ withapp, themeable, asthemecontext, layoutModeMixin ],
  props: {
    bordered: {
      type: Boolean,
      default: false
    }
  }
}
</script>
