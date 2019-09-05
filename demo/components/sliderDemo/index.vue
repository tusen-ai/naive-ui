<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Slider / n-slider
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <scaffold />
      <range />
      <mark-demo />
    </div>
  </div>
</template>

<script>
import scaffold from './scaffold.demo.vue'
import range from './range.demo.vue'
import markDemo from './mark.demo.vue'

export default {
  components: {
    scaffold,
    range,
    markDemo
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
