<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Alert / n-alert
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <type />
      <costum-icon />
      <using-built-in-icon />
      <no-icon />
    </div>
  </div>
</template>

<script>
import costumIcon from './costumIcon.demo.vue'
import usingBuiltInIcon from './usingBuiltInIcon.demo.vue'
import NoIcon from './noIcon.demo.vue'
import type from './type.demo.vue'

export default {
  components: {
    costumIcon,
    usingBuiltInIcon,
    NoIcon,
    type
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
