<template>
  <div
    class="n-base-tracking-rect"
    :class="{
      [`n-${theme}-theme`]: theme
    }"
  >
    <transition name="n-base-tracking-rect-transition">
      <div
        v-show="show"
        class="n-base-tracking-rect__body"
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
  name: 'NBaseTrackingRect',
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
    hideTrackingRect (delay = 300) {
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
    updateTrackingRectTop (el, getLightBarTop = elm => elm.offsetTop) {
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
