<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        TimePicker / n-time-picker
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basicUsage />
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
