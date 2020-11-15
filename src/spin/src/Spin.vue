<template>
  <div
    v-if="$slots.default"
    class="n-spin-container"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
  >
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
        :class="{
          [`n-spin--${size}-size`]: true,
          [`n-${mergedTheme}-theme`]: mergedTheme
        }"
        :stroke="stroke"
        :stroke-width="mergedStrokeWidth"
        :theme="mergedTheme"
        class="n-spin"
      />
    </transition>
  </div>
  <n-base-loading
    v-else
    :class="{
      [`n-spin--${size}-size`]: size
    }"
    :stroke="stroke"
    :stroke-width="mergedStrokeWidth"
    :theme="mergedTheme"
    class="n-spin"
  />
</template>

<script>
import { computed } from 'vue'
import { useCompitable } from 'vooks'
import { NBaseLoading } from '../../_base'
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import styles from './styles'
import { warn } from '../../_utils'

const STROKE_WIDTH = {
  small: 22,
  medium: 20,
  large: 18
}

export default {
  name: 'Spin',
  components: {
    NBaseLoading
  },
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ],
  props: {
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
    return {
      compitableShow: useCompitable(props, ['spinning', 'show']),
      mergedStrokeWidth: computed(() => {
        const { strokeWidth } = props
        if (strokeWidth !== undefined) return strokeWidth
        const { size } = props
        return STROKE_WIDTH[size]
      })
    }
  }
}
</script>
