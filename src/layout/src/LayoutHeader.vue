<template>
  <div
    class="n-layout-header"
    :class="{
      [`n-layout-header--${position}-positioned`]: position,
      [`n-${mergedTheme}-theme`]: mergedTheme,
      [`n-layout-header--bordered`]: bordered
    }"
    :style="mergedStyle"
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
  name: 'LayoutHeader',
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
