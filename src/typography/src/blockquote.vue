<template>
  <blockquote
    class="n-blockquote"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      'n-blockquote--align-text': alignText
    }"
  >
    <slot />
  </blockquote>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/blockquote'

export default {
  name: 'NBlockquote',
  cssrName: 'Typography',
  cssrId: 'TypographyBlockquote',
  mixins: [
    withapp,
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
