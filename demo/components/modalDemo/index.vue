<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Modal / n-modal
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
      <mask-closable />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import maskClosable from './maskClosable.demo.vue'

export default {
  components: {
    basicUsage,
    maskClosable
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
