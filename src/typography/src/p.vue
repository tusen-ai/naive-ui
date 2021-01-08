<template>
  <p class="n-p" :style="cssVars">
    <slot />
  </p>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useTheme } from '../../_mixins'
import style from './styles/p.cssr.js'
import { typographyLight } from '../styles'

export default defineComponent({
  name: 'P',
  props: {
    ...useTheme.props,
    depth: {
      validator (value) {
        return [1, 2, 3, '1', '2', '3'].includes(value)
      },
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Typography', 'P', style, typographyLight, props)
    return {
      cssVars: computed(() => {
        const { depth } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            pFontSize,
            pLineHeight,
            pMargin,
            [depth ? `pTextColor${depth}Depth` : 'pTextColor']: textColor
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--font-size': pFontSize,
          '--line-height': pLineHeight,
          '--margin': pMargin,
          '--text-color': textColor
        }
      })
    }
  }
})
</script>
