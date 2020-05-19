<template>
  <span
    class="n-avatar"
    :class="{
      [`n-avatar--${size}-size`]: typeof size !== 'number',
      [`n-avatar--circle-shaped`]: circle || round,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
    :style="{
      width: styleWidth,
      height: styleWidth,
      borderRadius: styleBorderRadius,
      ...syntheticStyle
    }"
  >
    <img v-if="!$scopedSlots.default && src" :src="src">
    <slot v-else-if="$scopedSlots.icon" name="icon" />
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
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'NAvatar',
  mixins: [withapp, themeable],
  props: {
    size: {
      type: [String, Number],
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
      ratio: 1,
      memorizedTextHTML: null
    }
  },
  computed: {
    styleTransfrom () {
      if (this.ratio !== 1) return `translateX(-50%) translateY(-50%) scale(${this.ratio})`
      return 'translateX(-50%) translateY(-50%)'
    },
    styleWidth () {
      if (typeof this.size === 'number') {
        return `${this.size}px`
      }
      return null
    },
    styleBorderRadius () {
      if (!this.circle && !this.round) return null
      if (typeof this.size === 'number') {
        return `${this.size / 2}px`
      }
      return null
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
      const textEl = this.$refs.text
      if (textEl) {
        const memorizedTextHTML = this.memorizedTextHTML
        if (memorizedTextHTML === null || memorizedTextHTML !== textEl.innerHTML) {
          this.memorizedTextHTML = textEl.innerHTML
          const selfEl = this.$el
          const elWidth = selfEl.offsetWidth
          const textWidth = textEl.offsetWidth
          const elHeight = selfEl.offsetHeight
          const textHeight = textEl.offsetHeight
          const radix = (this.circle || this.round) ? 0.75 : 0.85
          const ratio = Math.min(elWidth / textWidth * radix, elHeight / textHeight * radix)
          this.ratio = Math.min(1, ratio)
        }
      }
    }
  }
}
</script>
