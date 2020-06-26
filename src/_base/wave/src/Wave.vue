<template>
  <div
    class="n-base-wave"
    :class="{
      'n-base-wave--active': active
    }"
  />
</template>

<script>
import usecssr from '../../../_mixins/usecssr'
import styles from './styles/index.js'

export default {
  name: 'NBaseWave',
  mixins: [
    usecssr(styles)
  ],
  data () {
    return {
      active: false,
      animationTimerId: null
    }
  },
  beforeDestroy () {
    const animationTimerId = this.animationTimerId
    if (animationTimerId !== null) {
      window.clearTimeout(animationTimerId)
    }
  },
  methods: {
    play () {
      const animationTimerId = this.animationTimerId
      if (animationTimerId !== null) {
        window.clearTimeout(this.animationTimerId)
        this.active = false
        this.animationTimerId = null
      }
      this.$nextTick(() => {
        void this.$el.offsetHeight
        this.active = true
        this.animationTimerId = window.setTimeout(() => {
          this.active = false
          this.animationTimerId = null
        }, 1000)
      })
    }
  }
}
</script>
