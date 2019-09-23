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
      <custom-width />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import multiple from './multiple.demo.vue'
import cancelable from './cancelable.demo.vue'
import customWidth from './customWidth.demo.vue'

export default {
  components: {
    basicUsage,
    multiple,
    cancelable,
    customWidth
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
