<template>
  <n-popover
    v-model="value"
    class="n-tooltip"
    :arrow="arrow"
    :placement="placement"
    :trigger="trigger"
    :width="width"
    @show="handleShow"
    @hide="handleHide"
  >
    <template v-slot:activator>
      <slot name="activator" />
    </template>
    <div
      class="n-tooltip__content"
      :class="{
        'n-tooltip__content--fix-width': width !== null
      }"
    >
      <slot />
    </div>
  </n-popover>
</template>

<script>
/**
 * Tooltip: popover wearing waistcoat
 */
import NPopover from '../../Popover'

const DEFAULT_DURATION = 200
const DEFAULT_DELAY = null

export default {
  name: 'NTooltip',
  components: {
    NPopover
  },
  props: {
    placement: {
      type: String,
      default: 'bottom'
    },
    value: {
      type: Boolean,
      default: false
    },
    delay: {
      type: [String, Number],
      default: DEFAULT_DELAY
    },
    duration: {
      type: [String, Number],
      default: DEFAULT_DURATION,
      /**
       * make sure it is a positive number...
       */
      validator (value) {
        value = Number(value)
        if (Number.isNaN(value)) {
          return false
        } else {
          return value > 0
        }
      }
    },
    trigger: {
      default: 'hover',
      validator (value) {
        return ['click', 'hover', 'manual'].includes(value)
      }
    },
    arrow: {
      default: false,
      type: Boolean
    },
    width: {
      type: Number,
      default: null
    }
  },
  methods: {
    handleShow () {
      this.$emit('show')
    },
    handleHide () {
      this.$emit('hide')
    }
  }
}
</script>
