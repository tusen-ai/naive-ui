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
      <board />
      <card />
    </div>
  </div>
</template>

<script>
import basic from './basic.demo.vue'
import board from './board.demo.vue'
import card from './card.demo.vue'

export default {
  components: {
    basic,
    card,
    board
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
