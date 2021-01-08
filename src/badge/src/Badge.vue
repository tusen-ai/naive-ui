<template>
  <div
    class="n-badge"
    :class="{
      'n-badge--dot': dot,
      [`n-badge--as-is`]: !$slots.default
    }"
    :style="cssVars"
  >
    <slot />
    <transition
      name="n-fade-in-scale-up-transition"
      @after-enter="handleAfterEnter"
      @after-leave="handleAfterLeave"
    >
      <sup v-if="showBadge" class="n-badge-sup">
        <n-base-slot-machine
          v-if="!dot"
          :appeared="appeared"
          :max="max"
          :value="value"
        />
        <n-base-wave v-if="processing" />
      </sup>
    </transition>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useTheme } from '../../_mixins'
import { NBaseSlotMachine, NBaseWave } from '../../_base'
import { createKey } from '../../_utils'
import { badgeLight } from '../styles'
import style from './styles/index.cssr.js'

export default {
  name: 'Badge',
  components: {
    NBaseSlotMachine,
    NBaseWave
  },
  props: {
    ...useTheme.props,
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
  setup (props) {
    const themeRef = useTheme('Badge', 'Badge', style, badgeLight, props)
    const appearedRef = ref(false)
    const handleAfterEnter = () => {
      appearedRef.value = true
    }
    const handleAfterLeave = () => {
      appearedRef.value = false
    }
    const showBadgeRef = computed(() => {
      return (
        props.show &&
        (props.dot ||
          (props.value !== undefined && !(!props.showZero && props.value <= 0)))
      )
    })
    onMounted(() => {
      if (showBadgeRef.value) appearedRef.value = true
    })
    return {
      appeared: ref(false),
      number: computed(() => {
        const { max, value } = props
        return max === undefined || typeof value === 'string'
          ? value
          : value > max
            ? `${max}+`
            : value
      }),
      showBadge: showBadgeRef,
      handleAfterEnter,
      handleAfterLeave,
      cssVars: computed(() => {
        const { type, color: propColor } = props
        const {
          common: { cubicBezierEaseInOut, cubicBezierEaseOut },
          self: { [createKey('color', type)]: color }
        } = themeRef.value
        return {
          '--color': propColor || color,
          '--ripple-color': propColor || color,
          '--bezier': cubicBezierEaseInOut,
          '--ripple-bezier': cubicBezierEaseOut
        }
      })
    }
  }
}
</script>
