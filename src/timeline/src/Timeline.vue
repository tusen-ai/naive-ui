<template>
  <div
    class="n-timeline"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      [`n-timeline--${size}-size`]: true,
      [`n-timeline--${itemPlacement}-placement`]: true
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
  name: 'Timeline',
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ],
  provide () {
    return {
      NTimeline: this
    }
  },
  props: {
    itemPlacement: {
      validator (value) {
        return ['left', 'right'].includes(value)
      },
      default: 'left'
    },
    size: {
      validator (value) {
        return ['medium', 'large'].includes(value)
      },
      default: 'medium'
    }
  }
}
</script>
