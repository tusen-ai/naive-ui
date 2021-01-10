<template>
  <span ref="selfRef" class="n-avatar" :style="cssVars">
    <img v-if="!$slots.default && src" :src="src">
    <slot v-else-if="$slots.icon" name="icon" />
    <span
      v-else
      ref="textRef"
      class="n-avatar__text"
      :style="{
        background: color
      }"
    >
      <slot />
    </span>
  </span>
</template>

<script>
import { ref, computed, onUpdated, onMounted, defineComponent } from 'vue'
import { useTheme } from '../../_mixins'
import { avatarLight } from '../styles'
import { createKey } from '../../_utils'
import { validSize } from './config'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Avatar',
  props: {
    ...useTheme.props,
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
    let memoedTextHtml = null
    const textRef = ref(null)
    const selfRef = ref(null)
    const adjustText = () => {
      const { value: textEl } = textRef
      if (textEl) {
        if (memoedTextHtml === null || memoedTextHtml !== textEl.innerHTML) {
          memoedTextHtml = textEl.innerHTML
          const { value: selfEl } = selfRef
          const { offsetWidth: elWidth, offsetHeight: elHeight } = selfEl
          const { offsetWidth: textWidth, offsetHeight: textHeight } = textEl
          const radix = 0.9
          const ratio = Math.min(
            (elWidth / textWidth) * radix,
            (elHeight / textHeight) * radix,
            1
          )
          textEl.style.transform = `translateX(-50%) translateY(-50%) scale(${ratio})`
        }
      }
    }
    // Not Good Impl
    onMounted(() => adjustText())
    onUpdated(() => {
      console.log('updated')
      adjustText()
    })
    const themeRef = useTheme('Avatar', 'Avatar', style, avatarLight, props)
    return {
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
})
</script>
