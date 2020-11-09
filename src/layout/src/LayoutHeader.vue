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
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import styles from './styles/layout-header-footer'

export default {
  name: 'LayoutHeader',
  cssrName: 'Layout',
  cssrId: 'LayoutHeaderFooter',
  mixins: [
    configurable,
    themeable,
    layoutModeMixin,
    withCssr(styles)
  ],
  props: {
    bordered: {
      type: Boolean,
      default: false
    }
  }
}
</script>
