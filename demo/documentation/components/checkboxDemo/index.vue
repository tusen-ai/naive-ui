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
      <indeterminate />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import checkboxGroup from './checkboxGroup.demo'
import indeterminate from './indeterminate.demo'

export default {
  components: {
    basicUsage,
    checkboxGroup,
    indeterminate
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
