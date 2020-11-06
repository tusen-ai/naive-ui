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
  usecssr
} from '../../_mixins'
import styles from './styles/p'

export default {
  name: 'NP',
  cssrName: 'Typography',
  cssrId: 'TypographyP',
  mixins: [
    configurable,
    themeable,
    usecssr(styles)
  ],
  props: {
    depth: {
      validator (value) {
        return ['primary', 'secondary', 'tertiary'].includes(value)
      },
      default: null
    }
  }
}
</script>
