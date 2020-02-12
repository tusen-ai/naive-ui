<template>
  <div
    v-if="$slots.default"
    class="n-spin-container"
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
          [`n-spin--${size}-size`]: true
        }"
        :stroke="stroke"
        :stroke-width="synthesizedStrokeWidth"
        :theme="synthesizedTheme"
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
    :stroke-width="synthesizedStrokeWidth"
    :theme="synthesizedTheme"
    class="n-spin"
  />
</template>

<script>
import NBaseLoading from '../../_base/Loading'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asthemecontext from '../../_mixins/asthemecontext'

const STROKE_WIDTH = {
  small: 22,
  medium: 20,
  large: 18,
  'in-small': 30,
  'in-medium': 28,
  'in-large': 26
}

export default {
  name: 'NSpin',
  components: {
    NBaseLoading
  },
  mixins: [ withapp, themeable, asthemecontext ],
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
    synthesizedStrokeWidth () {
      const strokeWidth = this.strokeWidth
      if (strokeWidth !== null) return strokeWidth
      const size = this.size
      return STROKE_WIDTH[size]
    }
  }
}
</script>
