<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Popover
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <!-- <debug /> -->
      <basic-usage />
      <delay />
      <no-arrow />
      <trigger />
      <event />
      <placement />
      <raw />
      <width />
    </div>
  </div>
</template>

<script>
// import debug from './debug.demo.vue'
import basicUsage from './basicUsage.demo.vue'
import noArrow from './noArrow.demo.vue'
import trigger from './trigger.demo.vue'
import placement from './placement.demo.vue'
import event from './event.demo'
import delay from './delay.demo'
import raw from './raw.demo.vue'
import width from './width.demo.vue'

export default {
  components: {
    // debug,
    basicUsage,
    noArrow,
    trigger,
    placement,
    event,
    delay,
    raw,
    width
  },
  data () {
    return { content: 'hello', visible: false, showPopover: false, active1: false }
  }
}
</script>

<style scoped lang="scss">
.n-doc {
  width: 1020px;
  margin: auto;
}
</style>
