<template>
  <div
    class="n-input-number"
    :class="{
      [`n-input-number--${size}-size`]: true,
      'n-input-number--disabled': disabled
    }"
  >
    <button
      class="n-input-number__minus-button"
      :class="{
        [`n-input-bumber__button--disabled`]: value !== null && safeMin !== null && value <= safeMin
      }"
      @click="minus"
    >
      <n-icon type="md-remove" />
    </button>
    <input
      class="n-input-number__input"
      type="text"
      :value="value"
      :disabled="disabled ? 'disabled' : false"
      @blur="handleBlurOrEnter"
      @keyup.enter="handleBlurOrEnter"
    >
    <button
      class="n-input-number__add-button"
      :class="{
        [`n-input-bumber__button--disabled`]: value !== null && safeMax !== null && value >= safeMax
      }"
      @click="add"
    >
      <n-icon type="md-add" />
    </button>
    <div class="n-input-number__border-layer" />
  </div>
</template>

<script>
import NIcon from '../../Icon/index'

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
  components: {
    NIcon
  },
  props: {
    value: {
      type: Number,
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
    },
    size: {
      type: String,
      default: 'medium'
    },
    disabled: {
      type: Boolean,
      default: false
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
    },
    aValidValue () {
      if (this.safeMin !== null) {
        return Math.max(0, this.safeMin)
      } else if (this.safeMax !== null) {
        return Math.min(0, this.safeMax)
      } else {
        return 0
      }
    }
  },
  watch: {
    value (newValue, oldValue) {
      if (newValue !== null) {
        if (this.safeMax !== null && newValue > this.safeMax) {
          newValue = this.safeMax
        }
        if (this.safeMin !== null && newValue < this.safeMin) {
          newValue = this.safeMin
        }
      }
      this.$emit('change', newValue, oldValue)
      /**
       * newValue === oldValue won't trigger watcher!
       * so the call stack won't fall in loop
       */
      this.$emit('input', newValue)
    }
  },
  created () {
    if (this.value !== null) {
      if (this.safeMax !== null && this.value > this.safeMax) {
        this.$emit('input', this.safeMax)
      } else if (this.safeMin !== null && this.value < this.safeMin) {
        this.$emit('input', this.safeMin)
      }
    }
  },
  methods: {
    add () {
      if (this.value === null) {
        this.$emit('input', this.aValidValue)
      } else {
        const valueAfterChange = this.value + this.safeStep
        this.$emit('input', valueAfterChange)
      }
    },
    minus () {
      if (this.value === null) {
        this.$emit('input', this.aValidValue)
      } else {
        const valueAfterChange = this.value - this.safeStep
        this.$emit('input', valueAfterChange)
      }
    },
    handleBlurOrEnter (e) {
      const value = e.target.value
      if (value === '') {
        this.$emit('input', null)
        return
      }
      const parsedNumber = Number(value)
      if (Number.isNaN(parsedNumber)) {
        e.target.value = String(this.value)
      } else {
        const valueAfterChange = parsedNumber
        this.$emit('input', valueAfterChange)
      }
    }
  }
}
</script>
