<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Badge / n-badge
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
