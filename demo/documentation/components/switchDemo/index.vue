<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Switch / n-switch
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
      <change-event />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import changeEvent from './changeEvent.demo.vue'

export default {
  components: {
    basicUsage,
    changeEvent
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
