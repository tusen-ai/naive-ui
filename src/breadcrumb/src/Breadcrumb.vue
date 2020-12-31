<template>
  <div class="n-breadcrumb" :style="cssVars">
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useTheme } from '../../_mixins'
import { breadcrumbLight } from '../styles'
import style from './styles/index.cssr.js'

export default {
  name: 'Breadcrumb',
  provide () {
    return {
      NBreadcrumb: this
    }
  },
  props: {
    separator: {
      type: String,
      default: '/'
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Breadcrumb',
      'Breadcrumb',
      style,
      breadcrumbLight,
      props
    )
    return {
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            separatorColor,
            itemTextColor,
            itemTextColorHover,
            itemTextColorPressed,
            itemTextColorActive,
            fontSize,
            fontWeightActive
          }
        } = themeRef.value
        return {
          '--font-size': fontSize,
          '--bezier': cubicBezierEaseInOut,
          '--item-text-color': itemTextColor,
          '--item-text-color-hover': itemTextColorHover,
          '--item-text-color-pressed': itemTextColorPressed,
          '--item-text-color-active': itemTextColorActive,
          '--separator-color': separatorColor,
          '--font-weight-active': fontWeightActive
        }
      })
    }
  }
}
</script>
