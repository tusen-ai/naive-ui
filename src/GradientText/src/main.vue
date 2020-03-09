<template>
  <span
    class="n-gradient-text"
    :class="{
      [`n-gradient-text--${computedType}-type`]: true,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
    :style="{
      fontSize: styleFontSize,
      backgroundImage: styleBackgroundImage
    }"
  >
    <slot />
  </span>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import formatLength from '../../_utils/css/formatLength'

export default {
  name: 'NGradientText',
  mixins: [withapp, themeable],
  props: {
    size: {
      type: [String, Number],
      default: null
    },
    fontSize: {
      type: [String, Number],
      default: null
    },
    type: {
      type: String,
      default: 'primary'
    },
    color: {
      type: [Object, String],
      default: null
    },
    gradient: {
      type: [Object, String],
      default: null
    }
  },
  computed: {
    computedType () {
      if (this.type === 'danger') return 'error'
      return this.type
    },
    styleFontSize () {
      let fontSize = this.size || this.fontSize
      if (fontSize) fontSize = formatLength(fontSize)
      return fontSize || null
    },
    styleBackgroundImage () {
      const gradient = this.color || this.gradient
      if (typeof gradient === 'string') {
        return gradient
      } else if (gradient) {
        const deg = gradient.deg || 0
        const from = gradient.from
        const to = gradient.to
        return `linear-gradient(${deg}deg, ${from} 0%, ${to} 100%)`
      }
      return null
    }
  }
}
</script>
