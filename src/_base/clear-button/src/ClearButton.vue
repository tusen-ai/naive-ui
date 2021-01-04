<template>
  <div class="n-base-clear-button" :style="cssVars">
    <n-icon-switch-transition>
      <n-icon
        v-if="show"
        key="dismiss"
        :depth="null"
        class="n-base-clear-button__clear"
        @click="onClear"
        @mousedown.prevent
      >
        <dismiss-circle-icon />
      </n-icon>
      <div v-else key="icon" class="n-base-clear-button__placeholder">
        <slot />
      </div>
    </n-icon-switch-transition>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { DismissCircleIcon } from '../../icons'
import { NIcon } from '../../../icon'
import { NIconSwitchTransition } from '../../../_base'
import { useTheme } from '../../../_mixins'
import { baseClearButtonLight } from '../styles'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'BaseClearButton',
  components: {
    NIcon,
    DismissCircleIcon,
    NIconSwitchTransition
  },
  props: {
    ...useTheme.props,
    show: {
      type: Boolean,
      default: false
    },
    onClear: {
      type: Function,
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'BaseClearButton',
      'BaseClearButton',
      style,
      baseClearButtonLight,
      props
    )
    return {
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { size, color, colorHover, colorPressed }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--color': color,
          '--size': size,
          '--color-hover': colorHover,
          '--color-pressed': colorPressed
        }
      })
    }
  }
})
</script>
