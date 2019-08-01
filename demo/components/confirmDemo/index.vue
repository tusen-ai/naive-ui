<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Confirm / $NModal
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <type />
      <asyncDemo />
    </div>
  </div>
</template>

<script>
import type from './type.demo.vue'
import asyncDemo from './async.demo.vue'

export default {
  components: {
    type,
    asyncDemo
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
