<template>
  <span
    ref="selfRef"
    class="n-avatar"
    :class="{
      [`n-avatar--${size}-size`]: typeof size !== 'number',
      [`n-avatar--circle-shaped`]: circle || round
    }"
    :style="cssVars"
  >
    <img v-if="!$slots.default && src" :src="src">
    <slot v-else-if="$slots.icon" name="icon" />
    <span
      v-else
      ref="textRef"
      class="n-avatar__text"
      :style="{
        transform: styleTransform,
        backgroundColor: color
      }"
    >
      <slot />
    </span>
  </span>
</template>

<script>
import { ref, computed, onUpdated, onMounted } from 'vue'
import { useTheme } from '../../_mixins'
import { avatarLight } from '../styles'
import style from './styles/index.cssr.js'
import { validSize } from './config'
import { createKey } from '../../_utils'

export default {
  name: 'Avatar',
  props: {
    unstableTheme: {
      type: Object,
      default: undefined
    },
    unstableThemeOverrides: {
      type: Object,
      default: undefined
    },
    size: {
      validator (value) {
        return validSize.includes(value) || typeof value === 'number'
      },
      default: 'medium'
    },
    src: {
      type: String,
      default: undefined
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
      default: undefined
    }
  },
  setup (props) {
    const ratioRef = ref(1)
    const memorizedTextHtmlRef = ref(null)
    const styleTransformRef = computed(() => {
      const { value } = ratioRef
      if (value !== 1) {
        return `translateX(-50%) translateY(-50%) scale(${value})`
      }
      return 'translateX(-50%) translateY(-50%)'
    })
    const styleBorderRadiusRef = computed(() => {
      if (!props.circle && !props.round) return ''
      const { size } = props
      if (typeof size === 'number') {
        return `${size / 2}px`
      }
      return ''
    })
    const textRef = ref(null)
    const selfRef = ref(null)
    const adjustText = () => {
      const textEl = textRef.value
      if (textEl) {
        const memorizedTextHtml = memorizedTextHtmlRef.value
        if (
          memorizedTextHtml === null ||
          memorizedTextHtml !== textEl.innerHtml
        ) {
          memorizedTextHtmlRef.value = textEl.innerHtml
          const selfEl = selfRef.value
          const elWidth = selfEl.offsetWidth
          const textWidth = textEl.offsetWidth
          const elHeight = selfEl.offsetHeight
          const textHeight = textEl.offsetHeight
          const radix = props.circle || props.round ? 0.75 : 0.85
          const ratio = Math.min(
            (elWidth / textWidth) * radix,
            (elHeight / textHeight) * radix
          )
          ratioRef.value = Math.min(1, ratio)
        }
      }
    }
    // Not Good Impl
    onMounted(() => adjustText())
    onUpdated(() => adjustText())
    const themeRef = useTheme('Avatar', 'Avatar', style, avatarLight, props)
    return {
      styleTransform: styleTransformRef,
      styleBorderRadius: styleBorderRadiusRef,
      textRef,
      selfRef,
      cssVars: computed(() => {
        const { size, round, circle } = props
        const {
          self: {
            borderRadius,
            fontSize,
            color,
            [createKey('height', String(size))]: height
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--font-size': fontSize,
          '--border-radius': round || circle ? '50%' : borderRadius,
          '--color': color,
          '--bezier': cubicBezierEaseInOut,
          '--size': height || `${size}px`
        }
      })
    }
  }
}
</script>
