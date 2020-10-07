<template>
  <router-link
    v-if="to"
    class="n-a"
    :to="to"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
  >
    <slot />
  </router-link>
  <a
    v-else
    class="n-a"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
  ><slot /></a>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/a'

export default {
  name: 'NA',
  cssrName: 'Typography',
  cssrId: 'TypographyA',
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
  props: {
    to: {
      type: [String, Object],
      default: null
    }
  }
}
</script>
