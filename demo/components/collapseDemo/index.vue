<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Collapse / n-collapse
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
      <accordion />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import accordion from './accordion.demo.vue'

export default {
  components: {
    basicUsage,
    accordion
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
