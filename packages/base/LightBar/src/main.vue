<template>
  <div
    class="n-base-light-bar"
    :class="{
      [`n-${theme}-theme`]: theme
    }"
  >
    <transition name="n-base-light-bar-transition">
      <div
        v-show="show"
        class="n-base-light-bar__bar"
        :style="{
          top: styleTop,
          height: itemSize && itemSize + 'px'
        }"
      />
    </transition>
  </div>
</template>

<script>

export default {
  props: {
    theme: {
      type: String,
      default: null
    },
    itemSize: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      show: false,
      styleTop: null,
      vanishTimerId: null,
      containerScrollTop: 0
    }
  },
  methods: {
    hideLightBar (delay = 300) {
      this.vanishTimerId && window.clearTimeout(this.vanishTimerId)
      if (!delay) {
        this.vanishTimerId = null
        this.show = false
      } else {
        this.vanishTimerId = window.setTimeout(() => {
          this.show = false
        }, delay)
      }
    },
    updateLightBarTop (el, getLightBarTop = el => el.offsetTop) {
      if (!el) return
      this.vanishTimerId && window.clearTimeout(this.vanishTimerId)
      this.vanishTimerId = null
      this.show = true
      const top = getLightBarTop(el)
      this.styleTop = top + 'px'
    }
  }
}
</script>
