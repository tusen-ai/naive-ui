<template>
  <p
    class="n-p"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      [`n-p--${depth}-depth`]: depth
    }"
  >
    <slot />
  </p>
</template>

<script>
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import styles from './styles/p'

export default {
  name: 'P',
  cssrName: 'Typography',
  cssrId: 'TypographyP',
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ],
  props: {
    depth: {
      validator (value) {
        return [1, 2, 3, '1', '2', '3'].includes(value)
      },
      default: undefined
    }
  }
}
</script>
