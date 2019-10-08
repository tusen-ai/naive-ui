<template>
  <div
    class="n-badge"
    :class="{
      'n-badge--dot': dot,
      [`n-badge--${type}-type`]: type
    }"
  >
    <slot />
    <transition name="n-badge--transition">
      <sup
        v-if="(value !== null || dot) && !(hideZero && value === 0)"
        class="n-badge-sup"
      >
        <scroll-numbers
          v-if="!dot"
          :value="value"
        />
      </sup>
    </transition>
  </div>
</template>

<script>
import ScrollNumbers from './ScrollNumbers'

export default {
  name: 'NBadge',
  components: {
    ScrollNumbers
  },
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    dot: {
      type: Boolean,
      default: false
    },
    type: {
      validator () {
        return ['success', 'error', 'warning', 'info']
      },
      default: null
    },
    hideZero: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    number () {
      return (this.max === null || typeof value === 'string') ? this.value : (this.value > this.max ? `${this.max}+` : this.value)
    }
  }
}
</script>
