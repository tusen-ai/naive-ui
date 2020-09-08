<template>
  <div
    class="n-badge"
    :class="{
      'n-badge--dot': dot,
      [`n-badge--${type}-type`]: true,
      [`n-badge--${color || type}-colored`]: true,
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      [`n-badge--as-is`]: !$slots.default
    }"
  >
    <slot />
    <transition
      name="n-fade-in-scale-up-transition"
      @after-enter="handleAfterEnter"
      @after-leave="handleAfterLeave"
    >
      <sup
        v-if="showBadge"
        class="n-badge-sup"
      >
        <n-base-slot-machine
          v-if="!dot"
          :appeared="appeared"
          :max="max"
          :value="value"
        />
        <n-base-wave
          v-if="processing"
        />
      </sup>
    </transition>
  </div>
</template>

<script>
import themeable from '../../_mixins/themeable'
import withapp from '../../_mixins/withapp'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/index.js'
import NBaseSlotMachine from '../../_base/slot-machine'
import NBaseWave from '../../_base/wave'

export default {
  name: 'Badge',
  components: {
    NBaseSlotMachine,
    NBaseWave
  },
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
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
        return ['success', 'error', 'warning', 'info', 'default']
      },
      default: 'default'
    },
    show: {
      type: Boolean,
      default: true
    },
    showZero: {
      type: Boolean,
      default: false
    },
    processing: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      appeared: false
    }
  },
  computed: {
    number () {
      return (this.max === null || typeof value === 'string') ? this.value : (this.value > this.max ? `${this.max}+` : this.value)
    },
    showBadge () {
      return this.show && (this.dot || (this.value !== null && !(!this.showZero && this.value <= 0)))
    }
  },
  mounted () {
    if (this.showBadge) this.appeared = true
  },
  methods: {
    handleAfterEnter () {
      this.appeared = true
    },
    handleAfterLeave () {
      this.appeared = false
    }
  }
}
</script>
