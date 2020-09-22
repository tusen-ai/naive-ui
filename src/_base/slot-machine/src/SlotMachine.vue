<template>
  <span
    v-if="valueIsNumber"
    class="n-base-slot-machine"
  >
    <slot-machine-number
      v-for="(number, i) in numbers"
      :key="numbers.length - i - 1"
      :appeared="appeared"
      :old-original-number="oldValue"
      :new-original-number="newValue"
      :value="number"
    />
    <slot-machine-number
      v-if="max && max < value"
      key="+"
      :appeared="appeared"
      :value="'+'"
    />
  </span>
  <span
    v-else
    class="n-base-slot-machine"
  >
    {{ value }}
  </span>
</template>

<script>
import SlotMachineNumber from './SlotMachineNumber.vue'
import usecssr from '../../../_mixins/usecssr.js'
import styles from './styles/index.js'

export default {
  name: 'BaseSlotMachine',
  components: {
    SlotMachineNumber
  },
  mixins: [
    usecssr(styles)
  ],
  props: {
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
      default: null
    }
  },
  data () {
    return {
      oldValue: null,
      newValue: null
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
  },
  created () {
    this.newValue = this.value
  }
}
</script>
