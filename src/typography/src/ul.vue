<template>
  <ul
    class="n-ul"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      'n-ul--align-text': alignText
    }"
    v-bind="$attrs"
  >
    <slot />
  </ul>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/list'

export default {
  name: 'NUl',
  cssrName: 'Typography',
  cssrId: 'TypographyList',
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
