<template>
  <div ref="doc" class="n-doc">
    <div class="n-doc-header">
      <n-gradient-text :font-size="20"> DatePickerDebug </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <range />
    </div>
  </div>
</template>

<script lang="ts">
import range from './range.demo.vue'

export default {
  components: {
    range
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
