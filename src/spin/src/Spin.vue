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
        'n-spin-content--spinning': spinning
      }"
      class="n-spin-content"
    >
      <slot />
    </div>
    <transition name="n-fade-in-transition">
      <n-base-loading
        v-if="spinning"
        :class="{
          [`n-spin--${size}-size`]: true,
          [`n-${mergedTheme}-theme`]: mergedTheme
        }"
        :stroke="stroke"
        :stroke-width="syntheticStrokeWidth"
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
    :stroke-width="syntheticStrokeWidth"
    :theme="mergedTheme"
    class="n-spin"
  />
</template>

<script>
import NBaseLoading from '../../_base/loading'
import {
  configurable,
  themeable,
  usecssr
} from '../../_mixins'
import styles from './styles'

const STROKE_WIDTH = {
  small: 22,
  medium: 20,
  large: 18,
  'in-small': 30,
  'in-medium': 28,
  'in-large': 26
}

export default {
  name: 'Spin',
  components: {
    NBaseLoading
  },
  mixins: [
    configurable,
    themeable,
    usecssr(styles)
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
    spinning: {
      type: Boolean,
      default: true
    },
    strokeWidth: {
      type: Number,
      default: undefined
    }
  },
  computed: {
    syntheticStrokeWidth () {
      const { strokeWidth } = this
      if (strokeWidth !== undefined) return strokeWidth
      const size = this.size
      return STROKE_WIDTH[size]
    }
  }
}
</script>
