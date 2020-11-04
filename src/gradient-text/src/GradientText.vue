<template>
  <span
    class="n-gradient-text"
    :class="{
      [`n-gradient-text--${computedType}-type`]: true,
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
    :style="{
      ...mergedStyle,
      fontSize: styleFontSize,
      backgroundImage: styleBackgroundImage
    }"
  >
    <slot />
  </span>
</template>

<script>
import {
  configurable,
  themeable,
  usecssr
} from '../../_mixins'
import { formatLength } from '../../_utils'
import styles from './styles/index'

export default {
  name: 'GradientText',
  mixins: [
    configurable,
    themeable,
    usecssr(styles)
  ],
  props: {
    size: {
      type: [String, Number],
      default: undefined
    },
    fontSize: {
      type: [String, Number],
      default: undefined
    },
    type: {
      type: String,
      default: 'primary'
    },
    color: {
      type: [Object, String],
      default: undefined
    },
    gradient: {
      type: [Object, String],
      default: undefined
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
      return fontSize || undefined
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
      return undefined
    }
  }
}
</script>
