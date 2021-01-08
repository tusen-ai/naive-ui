<template>
  <div
    class="n-base-wave"
    :class="{
      'n-base-wave--active': active
    }"
  />
</template>

<script>
import { defineComponent } from 'vue'
import { useStyle } from '../../../_mixins'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'BaseWave',
  setup () {
    useStyle('BaseWave', style)
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
})
</script>
