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
    ...useTheme.props,
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
            border,
            [createKey('height', size)]: height
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--group-label-color': groupLabelColor,
          '--border': border,
          '--border-radius': borderRadius,
          '--text-color': textColor,
          '--font-size': fontSize,
          '--line-height': lineHeight,
          '--height': height
        }
      })
    }
  }
})
</script>
