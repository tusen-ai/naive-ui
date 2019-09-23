<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        InputNumber / n-input-number
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
      <disabled />
      <event />
      <min-and-max />
      <size />
      <step />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import disabled from './disabled.demo'
import event from './event.demo'
import minAndMax from './minAndMax.demo'
import size from './size.demo'
import step from './step.demo'

export default {
  components: {
    basicUsage,
    disabled,
    event,
    minAndMax,
    size,
    step
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
