<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Dropdown / n-dropdown
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
      <trigger />
      <placement />
      <cascade />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo'
import cascade from './cascade.demo.vue'
import placement from './placement.demo.vue'
import trigger from './trigger.demo.vue'

export default {
  components: {
    cascade,
    basicUsage,
    placement,
    trigger
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
