<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Tooltip
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
      <trigger />
      <event />
      <placement />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import trigger from './trigger.demo.vue'
import event from './event.demo.vue'
import placement from './placement.demo.vue'

export default {
  components: { basicUsage, trigger, event, placement },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
