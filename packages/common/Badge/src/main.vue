<template>
  <div
    class="n-badge"
    :class="{
      'n-badge--dot': dot,
      'n-badge--processing': processing,
      [`n-badge--${type}-type`]: type,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
    }"
  >
    <slot />
    <transition
      name="n-badge--transition"
      @after-enter="handleAfterEnter"
      @after-leave="handleAfterLeave"
    >
      <sup
        v-if="showBadge"
        class="n-badge-sup"
      >
        <div
          v-if="processing"
          class="n-badge-sup__ripple-mask"
        />
        <n-base-slot-machine
          v-if="!dot"
          :appeared="appeared"
          :max="max"
          :value="value"
        />
      </sup>
    </transition>
  </div>
</template>

<script>
import themeable from '../../../mixins/themeable'
import withapp from '../../../mixins/withapp'
import NBaseSlotMachine from '../../../base/SlotMachine'

export default {
  name: 'NBadge',
  components: {
    NBaseSlotMachine
  },
  mixins: [withapp, themeable],
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
