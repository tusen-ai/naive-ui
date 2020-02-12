<template>
  <div
    class="n-layout-header"
    :class="{
      [`n-layout-header--${mode}-positioned`]: mode,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      [`n-layout-header--bordered`]: bordered
    }"
    :style="synthesizedStyle"
  >
    <slot />
  </div>
</template>

<script>
import layoutModeMixin from './layoutModeMixin'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asthemecontext from '../../_mixins/asthemecontext'

export default {
  name: 'NLayoutHeader',
  mixins: [ withapp, themeable, asthemecontext, layoutModeMixin ],
  props: {
    bordered: {
      type: Boolean,
      default: false
    }
  }
}
</script>
