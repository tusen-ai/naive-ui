<template>
  <div
    class="n-badge"
    :class="{
      'n-badge--dot': dot,
      [`n-badge--${type}-type`]: true,
      [`n-${mergedTheme}-theme`]: mergedTheme,
      [`n-badge--as-is`]: !$slots.default
    }"
    :style="color ? {
      '--color': color,
      '--ripple-color': color
    } : null"
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
          :theme="mergedTheme"
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
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import { NBaseSlotMachine, NBaseWave } from '../../_base'
import styles from './styles/index.js'

export default {
  name: 'Badge',
  components: {
    NBaseSlotMachine,
    NBaseWave
  },
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ],
  props: {
    value: {
      type: [String, Number],
      default: undefined
    },
    max: {
      type: Number,
      default: undefined
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
      default: undefined
    }
  },
  data () {
    return {
      appeared: false
    }
  },
  computed: {
    number () {
      return (this.max === undefined || typeof value === 'string') ? this.value : (this.value > this.max ? `${this.max}+` : this.value)
    },
    showBadge () {
      return this.show && (this.dot || (this.value !== undefined && !(!this.showZero && this.value <= 0)))
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
