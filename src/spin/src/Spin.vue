<template>
  <div
    v-if="$scopedSlots.default"
    class="n-spin-container"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme
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
    <transition name="n-spin-transition">
      <n-base-loading
        v-if="spinning"
        :class="{
          [`n-spin--${size}-size`]: true,
          [`n-${syntheticTheme}-theme`]: syntheticTheme
        }"
        :stroke="stroke"
        :stroke-width="syntheticStrokeWidth"
        :theme="syntheticTheme"
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
    :theme="syntheticTheme"
    class="n-spin"
  />
</template>

<script>
import NBaseLoading from '../../_base/loading'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
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
    withapp,
    themeable,
    usecssr(styles)
  ],
  props: {
    stroke: {
      type: String,
      default: null
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
      default: null
    }
  },
  computed: {
    syntheticStrokeWidth () {
      const strokeWidth = this.strokeWidth
      if (strokeWidth !== null) return strokeWidth
      const size = this.size
      return STROKE_WIDTH[size]
    }
  }
}
</script>
