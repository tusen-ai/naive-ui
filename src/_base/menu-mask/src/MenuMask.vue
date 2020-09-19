<template>
  <transition
    name="n-fade-in-transition"
  >
    <div
      v-if="active"
      class="n-base-menu-mask"
      :class="{
        [`n-${theme}-theme`]: theme
      }"
    >
      <slot />
      {{ message }}
    </div>
  </transition>
</template>

<script>
import usecssr from '../../../_mixins/usecssr'
import styles from './styles'

export default {
  name: 'BaseMenuMask',
  mixins: [
    usecssr(styles)
  ],
  props: {
    theme: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    duration: {
      type: Number,
      default: 1500
    }
  },
  data () {
    return {
      message: null,
      timerId: null,
      active: false
    }
  },
  beforeUnmount () {
    if (this.timerId) window.clearTimeout(this.timerId)
  },
  methods: {
    showOnce (message) {
      if (this.timerId) window.clearTimeout(this.timerId)
      this.active = true
      this.message = message
      this.timerId = window.setTimeout(() => {
        this.active = false
        this.message = null
      }, this.duration)
    },
    show (message) {
      this.active = true
      this.message = message
    },
    hide () {
      this.active = false
      this.message = null
    }
  }
}
</script>
