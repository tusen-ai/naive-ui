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
      <no-arrow />
      <trigger />
      <placement />
    </div>
  </div>
</template>

<script>
import docCodeEditorMixin from '../docCodeEditorMixin'
// import debug from './debug.demo.vue'
import basicUsage from './basicUsage.demo.vue'
import noArrow from './noArrow.demo.vue'
import trigger from './trigger.demo.vue'
import placement from './placement.demo.vue'

export default {
  components: {
    // debug,
    basicUsage,
    noArrow,
    trigger,
    placement
  },
  mixins: [docCodeEditorMixin],
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
