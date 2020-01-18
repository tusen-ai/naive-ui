<template>
  <!-- <div style="position: absolute; left: 0; right: 0; top: 0; bottom: 0;"> -->
  <transition name="n-transfer-list-light-bar--transition">
    <div
      v-show="show"
      class="n-transfer-list-light-bar"
      :style="{
        top: styleTop
      }"
    />
  </transition>
  <!-- </div> -->
</template>

<script>
export default {
  data () {
    return {
      show: false,
      styleTop: null,
      vanishTimerId: null
    }
  },
  methods: {
    hideLightBar (delay = 300) {
      this.vanishTimerId && window.clearTimeout(this.vanishTimerId)
      this.vanishTimerId = window.setTimeout(() => {
        this.show = false
      }, delay)
    },
    updateLightBarPosition (el) {
      this.vanishTimerId && window.clearTimeout(this.vanishTimerId)
      this.vanishTimerId = null
      this.show = true
      this.styleTop = el.offsetTop + 'px'
    }
  }
}
</script>
