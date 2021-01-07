<template>
  <div v-if="$slots.default" class="n-spin-container" :style="cssVars">
    <div
      :class="{
        'n-spin-content--spinning': compitableShow
      }"
      class="n-spin-content"
    >
      <slot />
    </div>
    <transition name="n-fade-in-transition">
      <n-base-loading
        v-if="compitableShow"
        :stroke="stroke"
        :stroke-width="mergedStrokeWidth"
        :theme="'light'"
        class="n-spin"
      />
    </transition>
  </div>
  <n-base-loading
    v-else
    :style="cssVars"
    :stroke="stroke"
    :stroke-width="mergedStrokeWidth"
    :theme="'light'"
    class="n-spin"
  />
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useCompitable } from 'vooks'
import { NBaseLoading } from '../../_base'
import { useTheme } from '../../_mixins'
import { createKey, warn } from '../../_utils'
import { spinLight } from '../styles'
import style from './styles/index.cssr.js'

const STROKE_WIDTH = {
  small: 22,
  medium: 20,
  large: 18
}

export default defineComponent({
  name: 'Spin',
  components: {
    NBaseLoading
  },
  props: {
    ...useTheme.props,
    stroke: {
      type: String,
      default: undefined
    },
    size: {
      type: [String, Number],
      default: 'medium'
    },
    show: {
      type: Boolean,
      default: true
    },
    strokeWidth: {
      type: Number,
      default: undefined
    },
    spinning: {
      validator () {
        warn('spin', '`spinning` is deprecated, please use `show` instead.')
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Spin', 'Spin', style, spinLight, props)
    return {
      compitableShow: useCompitable(props, ['spinning', 'show']),
      mergedStrokeWidth: computed(() => {
        const { strokeWidth } = props
        if (strokeWidth !== undefined) return strokeWidth
        const { size } = props
        return STROKE_WIDTH[size]
      }),
      cssVars: computed(() => {
        const { size: spinSize } = props
        const {
          common: { cubicBezierEaseInOut },
          self: { opacitySpinning, color, [createKey('size', spinSize)]: size }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--opacity-spinning': opacitySpinning,
          '--size': size,
          '--color': color
        }
      })
    }
  }
})
</script>
