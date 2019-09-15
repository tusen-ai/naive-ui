<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        blockNode
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
      <block-node />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import blockNode from './blockNode.demo.vue'

export default {
  components: {
    blockNode,
    basicUsage
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
