<template>
  <div
    class="n-layout-footer"
    :class="{
      [`n-layout-footer--${position}-positioned`]: position,
      [`n-${mergedTheme}-theme`]: mergedTheme,
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
import usecssr from '../../_mixins/usecssr'
import styles from './styles/layout-header-footer'

export default {
  name: 'LayoutFooter',
  cssrName: 'Layout',
  cssrId: 'LayoutHeaderFooter',
  mixins: [
    withapp,
    themeable,
    layoutModeMixin,
    usecssr(styles)
  ],
  props: {
    bordered: {
      type: Boolean,
      default: false
    }
  }
}
</script>
