<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        CascaderDebug
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic />
    </div>
  </div>
</template>

<script>
import basic from './basic.demo.vue'

export default {
  components: {
    basic
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
