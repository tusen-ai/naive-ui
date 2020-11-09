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
  withCssr
} from '../../_mixins'
import styles from './styles/blockquote'

export default {
  name: 'NBlockquote',
  cssrName: 'Typography',
  cssrId: 'TypographyBlockquote',
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
