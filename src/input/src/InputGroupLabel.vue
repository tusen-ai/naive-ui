<template>
  <div
    class="n-input-group-label"
    :class="`n-input-group-label--${size}-size`"
    :style="cssVars"
  >
    <slot />
    <div class="n-input-group-label__border" />
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useTheme } from '../../_mixins'
import { createKey } from '../../_utils'
import { inputLight } from '../styles'
import style from './styles/input-group-label.cssr.js'

export default defineComponent({
  name: 'InputGroupLabel',
  props: {
    size: {
      type: String,
      default: 'medium'
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Input',
      'InputGroupLabel',
      style,
      inputLight,
      props
    )
    return {
      cssVars: computed(() => {
        const { size } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            groupLabelColor,
            borderRadius,
            textColor,
            lineHeight,
            fontSize,
            [createKey('height', size)]: height
          }
        } = themeRef.value
        return {
          '--ip-bezier': cubicBezierEaseInOut,
          '--ip-group-label-color': groupLabelColor,
          '--ip-border-radius': borderRadius,
          '--ip-text-color': textColor,
          '--ip-font-size': fontSize,
          '--ip-line-height': lineHeight,
          '--ip-height': height
        }
      })
    }
  }
})
</script>
