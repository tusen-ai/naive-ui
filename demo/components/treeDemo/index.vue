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
      <basic-usage />
      <scaffold />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import scaffold from './scaffold.demo.vue'

export default {
  components: {
    scaffold,
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
