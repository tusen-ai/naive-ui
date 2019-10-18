<template>
  <div
    class="n-timeline"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
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
  provide () {
    return {
      NTimeline: this
    }
  }
}
</script>
