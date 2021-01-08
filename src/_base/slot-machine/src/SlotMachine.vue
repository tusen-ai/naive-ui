<template>
  <span v-if="valueIsNumber" class="n-base-slot-machine" :style="cssVars">
    <transition-group name="n-fade-up-width-expand-transition" tag="span">
      <slot-machine-number
        v-for="(number, i) in numbers"
        :key="numbers.length - i - 1"
        :old-original-number="oldValue"
        :new-original-number="newValue"
        :value="number"
      />
    </transition-group>
    <n-fade-in-expand-transition key="+" width>
      <slot-machine-number v-if="max && max < value" :value="'+'" />
    </n-fade-in-expand-transition>
  </span>
  <span v-else class="n-base-slot-machine">
    {{ value }}
  </span>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { NFadeInExpandTransition } from '../../../_base'
import { useTheme } from '../../../_mixins'
import { baseSlotMachineLight } from '../styles'
import SlotMachineNumber from './SlotMachineNumber.vue'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'BaseSlotMachine',
  components: {
    NFadeInExpandTransition,
    SlotMachineNumber
  },
  props: {
    ...useTheme.props,
    value: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: Number,
      default: null
    },
    appeared: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'BaseSlotMachine',
      'BaseSlotMachine',
      style,
      baseSlotMachineLight,
      props
    )
    return {
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseOut }
        } = themeRef.value
        return {
          '--bezier-ease-out': cubicBezierEaseOut
        }
      })
    }
  },
  data () {
    return {
      oldValue: null,
      newValue: this.value
    }
  },
  computed: {
    valueIsString () {
      return typeof this.value === 'string'
    },
    valueIsNumber () {
      return typeof this.value === 'number'
    },
    numbers () {
      if (this.value < 1) return [0]
      const numbers = []
      let value = this.value
      if (this.max) {
        value = Math.min(this.max, value)
      }
      while (value >= 1) {
        numbers.push(value % 10)
        value /= 10
        value = Math.floor(value)
      }
      numbers.reverse()
      return numbers
    }
  },
  watch: {
    value (value, oldValue) {
      this.newValue = value
      this.oldValue = oldValue
    }
  }
})
</script>
