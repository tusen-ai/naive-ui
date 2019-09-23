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
      <multiple-circle-demo />
      <no-indicator />
      <color />
      <custom-indicator />
    </div>
  </div>
</template>

<script>
import circleDemo from './circle.demo.vue'
import lineDemo from './line.demo.vue'
import multipleCircleDemo from './multipleCircle.demo.vue'
import noIndicator from './noIndicator.demo.vue'
import color from './color.demo.vue'
import customIndicator from './customIndicator.demo'

export default {
  components: {
    circleDemo,
    lineDemo,
    multipleCircleDemo,
    noIndicator,
    color,
    customIndicator
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
