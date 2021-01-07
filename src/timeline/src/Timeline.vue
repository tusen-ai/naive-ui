<template>
  <div
    class="n-timeline"
    :class="{
      [`n-timeline--${size}-size`]: true,
      [`n-timeline--${itemPlacement}-placement`]: true
    }"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Timeline',
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
})
</script>
