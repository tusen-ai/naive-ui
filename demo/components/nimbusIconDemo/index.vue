<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        NimbusIcon / n-nimbus-icon
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
      <use-it-in-button />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import useItInButton from './useItInButton.demo.vue'

export default {
  components: {
    basicUsage,
    useItInButton
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
