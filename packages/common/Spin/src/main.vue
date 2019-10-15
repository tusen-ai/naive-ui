<template>
  <div
    v-if="$slots.default"
    class="n-spin-container"
  >
    <transition name="n-spin--transition">
      <n-base-loading
        v-if="spinning"
        class="n-spin"
        :stroke-width="strokeWidth"
        :class="{
          [`n-spin--${size}-size`]: true
        }"
        :theme="synthesizedTheme"
      />
    </transition>
    <div
      class="n-spin-content"
      :class="{
        'n-spin-content--spinning': spinning
      }"
    >
      <slot />
    </div>
  </div>
  <n-base-loading
    v-else
    class="n-spin"
    :stroke-width="strokeWidth"
    :class="{
      [`n-spin--${size}-size`]: size
    }"
    :theme="synthesizedTheme"
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
  mixins: [
    withapp,
    themeable
  ],
  props: {
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
  methods: {

  }
}
</script>
