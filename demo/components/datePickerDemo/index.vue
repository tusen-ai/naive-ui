<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        DatePicker / n-date-picker
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
      <disabled />
      <range />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import disabled from './disabled.demo.vue'
import range from './range.demo'

export default {
  components: {
    basicUsage,
    disabled,
    range
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
