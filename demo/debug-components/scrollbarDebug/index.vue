<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        scaffold
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <case1 />
    </div>
  </div>
</template>

<script>
import case1 from './case1.demo.vue'

export default {
  components: {
    case1
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
