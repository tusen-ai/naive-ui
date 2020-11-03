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
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles'

export default {
  name: 'Timeline',
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
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
