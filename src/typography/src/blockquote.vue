<template>
  <blockquote
    class="n-blockquote"
    :class="{
      'n-blockquote--align-text': alignText
    }"
    :style="cssVars"
  >
    <slot />
  </blockquote>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useTheme } from '../../_mixins'
import style from './styles/blockquote.cssr.js'
import { typographyLight } from '../styles'

export default defineComponent({
  name: 'Blockquote',
  props: {
    ...useTheme.props,
    alignText: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Typography',
      'Blockquote',
      style,
      typographyLight,
      props
    )
    return {
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            blockquoteTextColor,
            blockquotePrefixColor,
            blockquoteLineHeight,
            blockquoteFontSize
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--font-size': blockquoteFontSize,
          '--line-height': blockquoteLineHeight,
          '--prefix-color': blockquotePrefixColor,
          '--text-color': blockquoteTextColor
        }
      })
    }
  }
})
</script>
