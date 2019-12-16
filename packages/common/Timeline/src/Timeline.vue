<template>
  <div
    class="n-timeline"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      [`n-timeline--${size}-size`]: true,
      [`n-timeline--${itemPlacement}-placement`]: true
    }"
  >
    <slot />
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NTimeline',
  mixins: [withapp, themeable],
  props: {
    itemPlacement: {
      validator (value) {
        return ['left', 'right'].includes(value)
      },
      default: 'right'
    },
    size: {
      validator (value) {
        return ['medium', 'large'].includes(value)
      },
      default: 'medium'
    }
  },
  provide () {
    return {
      NTimeline: this
    }
  }
}
</script>
