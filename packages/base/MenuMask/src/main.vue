<template>
  <transition
    name="n-base-menu-mask--transition"
  >
    <div
      v-if="value"
      class="n-base-menu-mask"
    >
      <slot />
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NBaseMenuMask',
  props: {
    value: {
      type: Boolean,
      default: false
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
      timerId: null
    }
  },
  beforeDestroy () {
    if (this.timerId) window.clearTimeout(this.timerId)
  },
  methods: {
    showOnce (message) {
      if (this.timerId) window.clearTimeout(this.timerId)
      this.$emit('input', true)
      this.message = message
      this.timerId = window.setTimeout(() => {
        this.$emit('input', false)
        this.message = null
      }, this.duration)
    },
    show (message) {
      this.$emit('input', true)
      this.message = message
    },
    hide () {
      this.$emit('input', false)
      this.message = null
    }
  }
}
</script>
