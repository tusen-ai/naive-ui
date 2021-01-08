<template>
  <router-link v-if="to" class="n-a" :to="to" :style="cssVars">
    <slot />
  </router-link>
  <a v-else class="n-a" :style="cssVars"><slot /></a>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useTheme } from '../../_mixins'
import { typographyLight } from '../styles'
import style from './styles/a.cssr.js'

export default defineComponent({
  name: 'A',
  props: {
    ...useTheme.props,
    to: {
      type: [String, Object],
      default: null
    }
  },
  setup (props) {
    const themeRef = useTheme('Typography', 'A', style, typographyLight, props)
    return {
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { aTextColor }
        } = themeRef.value
        return {
          '--text-color': aTextColor,
          '--bezier': cubicBezierEaseInOut
        }
      })
    }
  }
})
</script>
