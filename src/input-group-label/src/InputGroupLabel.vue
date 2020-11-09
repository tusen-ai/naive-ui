<template>
  <div
    class="n-input-group-label"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      [`n-input-group-label--${size}-size`]: true
    }"
  >
    <slot />
  </div>
</template>

<script>
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import styles from './styles'

export default {
  name: 'InputGroupLabel',
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ],
  props: {
    size: {
      type: String,
      default: 'medium'
    }
  }
}
</script>
