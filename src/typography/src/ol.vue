<template>
  <ol
    class="n-ol"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      'n-ol--align-text': alignText
    }"
    v-on="$listeners"
  >
    <slot />
  </ol>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/list'

export default {
  name: 'NOl',
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
