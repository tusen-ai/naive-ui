<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Tag / n-tag
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'

export default {
  components: {
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
