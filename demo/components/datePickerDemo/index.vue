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
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import disabled from './disabled.demo.vue'

export default {
  components: {
    basicUsage,
    disabled
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
