<template>
  <div
    v-if="$slots.default"
    class="n-spin-container"
  >
    <transition name="n-spin--transition">
      <n-base-loading
        v-if="spinning"
        :class="{
          [`n-spin--${size}-size`]: true
        }"
        :stroke="stroke"
        :stroke-width="strokeWidth"
        :theme="synthesizedTheme"
        class="n-spin"
      />
    </transition>
    <div
      :class="{
        'n-spin-content--spinning': spinning
      }"
      class="n-spin-content"
    >
      <slot />
    </div>
  </div>
  <n-base-loading
    v-else
    :class="{
      [`n-spin--${size}-size`]: size
    }"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    :theme="synthesizedTheme"
    class="n-spin"
  />
</template>

<script>
import NBaseLoading from '../../../base/Loading'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NSpin',
  components: {
    NBaseLoading
  },
  mixins: [withapp, themeable],
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
  methods: {}
}
</script>
