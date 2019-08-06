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
      <checkbox-group />
    </div>
  </div>
</template>

<script>
import scaffold from './scaffold.demo.vue'
import checkboxGroup from './checkboxGroup.demo'

export default {
  components: {
    scaffold,
    checkboxGroup
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
