<template>
  <p
    class="n-p"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      [`n-p--${depth}-depth`]: depth
    }"
  >
    <slot />
  </p>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'NP',
  cssrName: 'Typography',
  mixins: [withapp, themeable],
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
