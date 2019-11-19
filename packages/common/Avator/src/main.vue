<template>
  <span
    class="n-avatar"
    :class="{
      [`n-avatar--${size}-size`]: true,
      [`n-avatar--circle-shaped`]: circle || round
    }"
  >
    <img v-if="!$slots.default && src" :src="src">
    <slot v-else-if="$slots.icon" name="icon" />
    <span
      v-else
      ref="text"
      class="n-avatar__text"
      :style="{
        transform: styleTransfrom,
        backgroundColor: color
      }"
    >
      <slot />
    </span>
  </span>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NAvatar',
  mixins: [withapp, themeable],
  props: {
    size: {
      type: String,
      default: 'medium'
    },
    src: {
      type: String,
      default: null
    },
    circle: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      ratio: 1
    }
  },
  computed: {
    styleTransfrom () {
      if (this.ratio !== 1) return `translateX(-50%) translateY(-50%) scale(${this.ratio})`
      return 'translateX(-50%) translateY(-50%)'
    }
  },
  updated () {
    this.adjustText()
  },
  mounted () {
    this.adjustText()
  },
  methods: {
    adjustText () {
      if (this.$refs.text) {
        const elWidth = this.$el.offsetWidth
        const textWidth = this.$refs.text.offsetWidth
        const elHeight = this.$el.offsetHeight
        const textHeight = this.$el.offsetHeight
        const ratio = Math.min(elWidth / textWidth * 0.85, elHeight / textHeight * 0.85)
        this.ratio = Math.min(1, ratio)
      }
    }
  }
}
</script>
