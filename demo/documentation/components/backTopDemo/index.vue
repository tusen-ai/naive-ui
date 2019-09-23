<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        BackTop / n-back-top
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
      <target-container-selector />
      <change-position />
      <visibility-height />
      <div style="height: 1200px; width: 100%;" />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import changePosition from './changePosition.demo.vue'
import visibilityHeight from './visibilityHeight.demo.vue'
import targetContainerSelector from './targetContainerSelector.demo'

export default {
  components: {
    basicUsage,
    changePosition,
    visibilityHeight,
    targetContainerSelector
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
