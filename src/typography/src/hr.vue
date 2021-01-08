<template>
  <ul class="n-hr" :style="cssVars">
    <slot />
  </ul>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useTheme } from '../../_mixins'
import { typographyLight } from '../styles'
import style from './styles/hr.cssr.js'

export default defineComponent({
  name: 'Hr',
  props: useTheme.props,
  setup (props) {
    const themeRef = useTheme('Typography', 'Hr', style, typographyLight, props)
    return {
      cssVars: computed(() => {
        return {
          '--color': themeRef.value.self.hrColor
        }
      })
    }
  }
})
</script>
