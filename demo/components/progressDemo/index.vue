<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Progress / n-progress
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <circle-demo />
      <line-demo />
    </div>
  </div>
</template>

<script>
import circleDemo from './circle.demo.vue'
import lineDemo from './line.demo.vue'

export default {
  components: {
    circleDemo,
    lineDemo
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
