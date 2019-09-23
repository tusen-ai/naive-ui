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
      <scaffold />
    </div>
  </div>
</template>

<script>
import scaffold from './scaffold.demo.vue'

export default {
  components: {
    scaffold
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
