<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Checkbox
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
      <checkbox-group />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import checkboxGroup from './checkboxGroup.demo'

export default {
  components: {
    basicUsage,
    checkboxGroup
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
