<template>
  <ul
    class="n-ul"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      'n-ul--align-text': alignText
    }"
    v-bind="$attrs"
  >
    <slot />
  </ul>
</template>

<script>
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import styles from './styles/list'

export default {
  name: 'Ul',
  cssrName: 'Typography',
  cssrId: 'TypographyList',
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ],
  props: {
    alignText: {
      type: Boolean,
      default: false
    }
  }
}
</script>
