<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Spin / n-spin
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <scaffold />
      <wrap />
    </div>
  </div>
</template>

<script>
import scaffold from './scaffold.demo.vue'
import wrap from './wrap.demo.vue'

export default {
  components: {
    scaffold,
    wrap
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
