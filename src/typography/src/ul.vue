<template>
  <ul
    class="n-ul"
    :class="{
      'n-ul--align-text': alignText
    }"
    :style="cssVars"
  >
    <slot />
  </ul>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useTheme } from '../../_mixins'
import { typographyLight } from '../styles'
import style from './styles/list.cssr.js'

export default defineComponent({
  name: 'Ul',
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
      'Ol&Ul',
      style,
      typographyLight,
      props
    )
    return {
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            olPadding,
            ulPadding,
            liMargin,
            liTextColor,
            liLineHeight,
            liFontSize
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--font-size': liFontSize,
          '--line-height': liLineHeight,
          '--text-color': liTextColor,
          '--li-margin': liMargin,
          '--ol-padding': olPadding,
          '--ul-padding': ulPadding
        }
      })
    }
  }
})
</script>
