<template>
  <div
    class="n-base-wave"
    :class="{
      'n-base-wave--active': active
    }"
  />
</template>

<script>
import { withCssr } from '../../../_mixins'
import styles from './styles/index.js'

export default {
  name: 'BaseWave',
  mixins: [
    withCssr(styles)
  ],
  props: {
    theme: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      active: false,
      animationTimerId: null
    }
  },
  beforeUnmount () {
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
