<template>
  <div>
    <button @click="minus">
      -
    </button><input
      type="text"
      :value="value"
    ><button @click="add">
      +
    </button>
  </div>
</template>

<script>
const DEFAULT_STEP = 1

function parseNumber (number) {
  if (number === null) return null
  if (typeof number === 'number') {
    return number
  } else {
    const parsedNumber = Number(number)
    if (Number.isNaN(parsedNumber)) return null
    else {
      return parsedNumber
    }
  }
}

export default {
  name: 'NInputNumber',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [Number, String],
      default: null
    },
    step: {
      type: [Number, String],
      default: DEFAULT_STEP
    },
    min: {
      type: [Number, String],
      default: null
    },
    max: {
      type: [Number, String],
      default: null
    }
  },
  computed: {
    safeStep () {
      const parsedNumber = parseNumber(this.step)
      if (parsedNumber !== null) return parsedNumber === 0 ? DEFAULT_STEP : Math.abs(parsedNumber)
      else return DEFAULT_STEP
    },
    safeMin () {
      const parsedNumber = parseNumber(this.min)
      if (parsedNumber !== null) return parsedNumber
      else return null
    },
    safeMax () {
      const parsedNumber = parseNumber(this.max)
      if (parsedNumber !== null) return parsedNumber
      else return null
    }
  },
  created () {
    this.guardCurrentValue()
  },
  methods: {
    guardCurrentValue () {
      if (typeof this.value !== 'number') {
        const parsedNumber = Number(this.value)
        if (Number.isNaN(parsedNumber)) {
          this.$emit('change', 0)
        } else {
          this.$emit('change', parsedNumber)
        }
      }
    },
    add () {
      this.guardCurrentValue()
      const previousValue = this.value
      let valueAfterChange = this.value + this.safeStep
      if (this.safeMax !== null && valueAfterChange > this.safeMax) {
        valueAfterChange = this.safeMax
      }
      if (valueAfterChange !== previousValue) {
        this.$emit('change', valueAfterChange)
      }
    },
    minus () {
      this.guardCurrentValue()
      const previousValue = this.value
      let valueAfterChange = this.value - this.safeStep
      if (this.safeMin !== null && valueAfterChange < this.safeMin) {
        valueAfterChange = this.safeMin
      }
      if (valueAfterChange !== previousValue) {
        this.$emit('change', valueAfterChange)
      }
    }
  }
}
</script>
