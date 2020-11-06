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
  usecssr
} from '../../_mixins'
import styles from './styles/hr'

export default {
  name: 'NHr',
  cssrName: 'Typography',
  cssrId: 'TypographyHr',
  mixins: [
    configurable,
    themeable,
    usecssr(styles)
  ]
}
</script>
