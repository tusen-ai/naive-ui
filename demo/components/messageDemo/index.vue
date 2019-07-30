<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Message / $NMessage
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
      <custom-icon />
      <duration />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import customIcon from './customIcon.demo.vue'
import duration from './duration.demo.vue'

export default {
  components: {
    basicUsage,
    customIcon,
    duration
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
