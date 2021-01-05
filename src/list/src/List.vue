<template>
  <ul
    class="n-list"
    :class="{
      'n-list--bordered': bordered,
      [`n-list--${size}-size`]: size
    }"
    :style="cssVars"
  >
    <div v-if="$slots.header" class="n-list__header">
      <slot name="header" />
    </div>
    <slot />
    <div v-if="$slots.footer" class="n-list__footer">
      <slot name="footer" />
    </div>
  </ul>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useTheme } from '../../_mixins'
import { listLight } from '../styles'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'List',
  props: {
    ...useTheme.props,
    size: {
      type: String,
      default: 'medium'
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const themeRef = useTheme('List', 'List', style, listLight, props)
    return {
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            fontSize,
            textColor,
            color,
            colorModal,
            borderColor,
            borderRadius
          }
        } = themeRef.value
        return {
          '--font-size': fontSize,
          '--bezier': cubicBezierEaseInOut,
          '--text-color': textColor,
          '--color': color,
          '--border-radius': borderRadius,
          '--border-color': borderColor,
          '--color-modal': colorModal
        }
      })
    }
  }
})
</script>
