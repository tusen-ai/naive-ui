<template>
  <span
    class="n-gradient-text"
    :class="{
      [`n-gradient-text--${compatibleType}-type`]: true
    }"
    :style="{
      fontSize: styleFontSize,
      backgroundImage: styleBgImage,
      ...cssVars
    }"
  >
    <slot />
  </span>
</template>

<script>
import { defineComponent, computed, onBeforeMount } from 'vue'
import { useTheme } from '../../_mixins'
import { createKey, formatLength } from '../../_utils'
import { gradientTextLight } from '../styles'
import style from './styles/index.cssr.js'

let houdiniRegistered = false

export default defineComponent({
  name: 'GradientText',
  props: {
    ...useTheme.props,
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
  setup (props) {
    onBeforeMount(() => {
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
    })
    const compatibleTypeRef = computed(() => {
      const { type } = props
      if (type === 'danger') return 'error'
      return type
    })
    const styleFontSizeRef = computed(() => {
      let fontSize = props.size || props.fontSize
      if (fontSize) fontSize = formatLength(fontSize)
      return fontSize || undefined
    })
    const styleBgImageRef = computed(() => {
      const gradient = props.color || props.gradient
      if (typeof gradient === 'string') {
        return gradient
      } else if (gradient) {
        const deg = gradient.deg || 0
        const from = gradient.from
        const to = gradient.to
        return `linear-gradient(${deg}deg, ${from} 0%, ${to} 100%)`
      }
      return undefined
    })
    const themeRef = useTheme(
      'GradientText',
      'GradientText',
      style,
      gradientTextLight,
      props
    )
    return {
      compatibleType: compatibleTypeRef,
      styleFontSize: styleFontSizeRef,
      styleBgImage: styleBgImageRef,
      cssVars: computed(() => {
        const { value: type } = compatibleTypeRef
        const {
          common: { cubicBezierEaseInOut },
          self: {
            rotate,
            [createKey('colorStart', type)]: colorStart,
            [createKey('colorEnd', type)]: colorEnd,
            fontWeight
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--rotate': rotate,
          '--color-start': colorStart,
          '--color-end': colorEnd,
          '--font-weight': fontWeight
        }
      })
    }
  }
})
</script>
