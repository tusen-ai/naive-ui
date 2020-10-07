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
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/p'

export default {
  name: 'NP',
  cssrName: 'Typography',
  cssrId: 'TypographyP',
  mixins: [
    withapp,
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
