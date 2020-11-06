<template>
  <div
    class="n-layout-footer"
    :class="{
      [`n-layout-footer--${position}-positioned`]: position,
      [`n-${mergedTheme}-theme`]: mergedTheme,
      [`n-layout-footer--bordered`]: bordered
    }"
    :style="mergedStyle"
  >
    <slot />
  </div>
</template>

<script>
import layoutModeMixin from './layoutModeMixin'
import {
  configurable,
  themeable,
  usecssr
} from '../../_mixins'
import styles from './styles/layout-header-footer'

export default {
  name: 'LayoutFooter',
  cssrName: 'Layout',
  cssrId: 'LayoutHeaderFooter',
  mixins: [
    configurable,
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
