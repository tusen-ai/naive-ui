<template>
  <ul
    class="n-hr"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
  >
    <slot />
  </ul>
</template>

<script>
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import styles from './styles/hr'

export default {
  name: 'Hr',
  cssrName: 'Typography',
  cssrId: 'TypographyHr',
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ]
}
</script>
