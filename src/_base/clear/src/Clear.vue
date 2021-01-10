<template>
  <div class="n-base-clear">
    <n-icon-switch-transition>
      <n-base-icon
        v-if="show"
        key="dismiss"
        class="n-base-clear__clear"
        :style="cssVars"
        @click="onClear"
        @mousedown.prevent
      >
        <dismiss-circle-icon />
      </n-base-icon>
      <div v-else key="icon" class="n-base-clear__placeholder">
        <slot />
      </div>
    </n-icon-switch-transition>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import NBaseIcon from '../../icon'
import { NIconSwitchTransition } from '../../../_base'
import { useTheme } from '../../../_mixins'
import { DismissCircleIcon } from '../../icons'
import { baseClearLight } from '../styles'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'BaseClear',
  components: {
    NBaseIcon,
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
      'BaseClear',
      'BaseClear',
      style,
      baseClearLight,
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
