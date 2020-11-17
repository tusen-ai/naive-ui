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
  withCssr
} from '../../_mixins'
import { formatLength } from '../../_utils'
import styles from './styles/index'

let houdiniRegistered = false

export default {
  name: 'GradientText',
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
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
  },
  beforeMount () {
    if (!houdiniRegistered) {
      houdiniRegistered = true
      if (window?.CSS?.registerProperty) {
        CSS.registerProperty({
          name: '--start-stop',
          syntax: '<color>',
          inherits: false,
          initialValue: 'transparent'
        })
        CSS.registerProperty({
          name: '--end-stop',
          syntax: '<color>',
          inherits: false,
          initialValue: 'transparent'
        })
      }
    }
  }
}
</script>
