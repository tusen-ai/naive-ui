<template>
  <div
    class="n-divider"
    :class="{
      'n-divider--vertical': vertical,
      'n-divider--no-title': !$slots.default,
      'n-divider--dashed': dashed,
      [`n-divider--title-position-${titlePlacement}`]:
        $slots.default && titlePlacement
    }"
    :style="cssVars"
  >
    <hr v-if="!vertical" class="n-divider__line n-divider__line--left">
    <div v-if="!vertical && $slots.default" class="n-divider__title">
      <slot />
    </div>
    <div
      v-if="!vertical && $slots.default"
      class="n-divider__line n-divider__line--right"
    />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import { dividerLight } from '../styles'
import style from './styles/index.cssr'

export default {
  name: 'Divider',
  props: {
    ...useTheme.props,
    titlePlacement: {
      type: String,
      default: 'center'
    },
    dashed: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const themeRef = useTheme('Divider', 'Divider', style, dividerLight, props)
    return {
      ...useConfig(props),
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { color, textColor, fontWeight }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--color': color,
          '--text-color': textColor,
          '--font-weight': fontWeight
        }
      })
    }
  }
}
</script>
