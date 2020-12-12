<template>
  <span v-if="valueIsNumber" class="n-base-slot-machine">
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
import { NFadeInExpandTransition } from '../../../_base'
import SlotMachineNumber from './SlotMachineNumber.vue'
import { withCssr } from '../../../_mixins'
import styles from './styles/index.js'

export default {
  name: 'BaseSlotMachine',
  components: {
    NFadeInExpandTransition,
    SlotMachineNumber
  },
  mixins: [withCssr(styles)],
  props: {
    theme: {
      type: String,
      default: undefined
    },
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
}
</script>
