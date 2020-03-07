<template>
  <div
    class="n-layout-header"
    :class="{
      [`n-layout-header--${position}-positioned`]: position,
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      [`n-layout-header--bordered`]: bordered
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
