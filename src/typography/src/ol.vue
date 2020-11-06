<template>
  <ol
    class="n-ol"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      'n-ol--align-text': alignText
    }"
    v-bind="$attrs"
  >
    <slot />
  </ol>
</template>

<script>
import {
  configurable,
  themeable,
  usecssr
} from '../../_mixins'
import styles from './styles/list'

export default {
  name: 'NOl',
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
