<template>
  <blockquote
    class="n-blockquote"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      'n-blockquote--align-text': alignText
    }"
  >
    <slot />
  </blockquote>
</template>

<script>
import {
  configurable,
  themeable,
  usecssr
} from '../../_mixins'
import styles from './styles/blockquote'

export default {
  name: 'NBlockquote',
  cssrName: 'Typography',
  cssrId: 'TypographyBlockquote',
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
