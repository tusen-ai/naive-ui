<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Popselect / n-popselect
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
      <multiple />
      <cancelable />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import multiple from './multiple.demo.vue'
import cancelable from './cancelable.demo'

export default {
  components: {
    basicUsage,
    multiple,
    cancelable
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
