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
  usecssr
} from '../../_mixins'
import styles from './styles/list'

export default {
  name: 'NUl',
  cssrName: 'Typography',
  cssrId: 'TypographyList',
  mixins: [
    configurable,
    themeable,
    usecssr(styles)
  ],
  props: {
    alignText: {
      type: Boolean,
      default: false
    }
  }
}
</script>
