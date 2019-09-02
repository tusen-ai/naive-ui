<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Tabs / n-tabs
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic />
      <card />
    </div>
  </div>
</template>

<script>
import basic from './basic.demo.vue'
import card from './card.demo.vue'

export default {
  components: {
    basic,
    card
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
