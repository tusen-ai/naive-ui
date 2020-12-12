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
import { configurable, themeable, withCssr } from '../../_mixins'
import styles from './styles/a'

export default {
  name: 'A',
  cssrName: 'Typography',
  cssrId: 'TypographyA',
  mixins: [configurable, themeable, withCssr(styles)],
  props: {
    to: {
      type: [String, Object],
      default: null
    }
  }
}
</script>
