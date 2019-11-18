<template>
  <div
    class="n-layout-header"
    :class="{
      [`n-layout-header--${mode}-positioned`]: mode,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      [`n-layout-header--bordered`]: bordered
    }"
  >
    <slot />
  </div>
</template>

<script>
import layoutModeMixin from './layoutModeMixin'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NLayoutHeader',
  mixins: [ withapp, themeable, layoutModeMixin ],
  props: {
    bordered: {
      type: Boolean,
      default: true
    }
  }
}
</script>
