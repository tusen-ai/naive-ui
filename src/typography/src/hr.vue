<template>
  <ul
    class="n-hr"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
  >
    <slot />
  </ul>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/hr'

export default {
  name: 'NHr',
  cssrName: 'Typography',
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ]
}
</script>
