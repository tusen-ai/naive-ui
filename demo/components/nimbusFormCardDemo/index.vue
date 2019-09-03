<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Nimbus Form Card / n-nimbus-form-card
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
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
