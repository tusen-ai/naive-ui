<template>
  <div
    class="n-input-number"
    :class="{
      [`n-input-number--${size}-size`]: true,
      'n-input-number--disabled': disabled,
      'n-input-number--invalid': invalid,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
  >
    <button
      tabindex="-1"
      type="button"
      class="n-input-number__minus-button"
      :class="{
        [`n-input-number__minus-button--disabled`]: !minusable
      }"
      @mousedown="handleMouseDown"
      @click="minus"
    >
      <n-icon><md-remove /></n-icon>
    </button>
    <input
      ref="input"
      class="n-input-number__input"
      type="text"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled ? 'disabled' : false"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.enter="handleEnter"
    >
    <button
      tabindex="-1"
      type="button"
      class="n-input-number__add-button"
      :class="{
        [`n-input-number__add-button--disabled`]: !addable
      }"
      @mousedown="handleMouseDown"
      @click="add"
    >
      <n-icon>
        <md-add />
      </n-icon>
    </button>
    <div class="n-input-number__border-mask" />
  </div>
</template>

<script>
import NIcon from '../../Icon/index'
import themeable from '../../_mixins/themeable'
import withapp from '../../_mixins/withapp'
import asformitem from '../../_mixins/asformitem'
import mdRemove from '../../_icons/md-remove'
import mdAdd from '../../_icons/md-add'

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
    NIcon,
    mdRemove,
    mdAdd
  },
  mixins: [withapp, themeable, asformitem()],
  model: {
    prop: 'value',
    event: 'change'
  },
  inject: {
    NFormItem: {
      default: null
    }
  },
  props: {
    placeholder: {
      type: String,
      default: null
    },
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
    },
    validator: {
      type: Function,
      default: null
    }
  },
  computed: {
    safeStep () {
      const parsedNumber = parseNumber(this.step)
      if (parsedNumber !== null) { return parsedNumber === 0 ? DEFAULT_STEP : Math.abs(parsedNumber) } else return DEFAULT_STEP
    },
    safeMin () {
      const parsedNumber = parseNumber(this.min)
      if (parsedNumber !== null) return parsedNumber
      else return null
    },
    invalid () {
      if (this.value === null) return false
      if (this.validator && !this.validator(this.value)) return true
      if (this.safeMin !== null && this.value < this.safeMin) return true
      if (this.safeMax !== null && this.value > this.safeMax) return true
      return false
    },
    minusable () {
      if (this.validator) {
        if (this.value !== null) return this.validator(this.value - this.step)
        else return false
      } else {
        return !(
          this.value !== null &&
          this.safeMin !== null &&
          this.value <= this.safeMin
        )
      }
    },
    addable () {
      if (this.validator) {
        if (this.value !== null) return this.validator(this.value + this.step)
        else return false
      } else {
        return !(
          this.value !== null &&
          this.safeMax !== null &&
          this.value >= this.safeMax
        )
      }
    },
    safeMax () {
      const parsedNumber = parseNumber(this.max)
      if (parsedNumber !== null) return parsedNumber
      else return null
    }
  },
  methods: {
    emitChangeEvent (value) {
      if (value !== this.value) {
        this.$emit('change', value)
      }
    },
    createValidValue () {
      if (this.validator) return null
      if (this.safeMin !== null) {
        return Math.max(0, this.safeMin)
      } else if (this.safeMax !== null) {
        return Math.min(0, this.safeMax)
      } else {
        return 0
      }
    },
    handleMouseDown (e) {
      if (document.activeElement !== this.$refs.input) {
        this.$refs.input.focus()
      }
      e.preventDefault()
    },
    handleFocus (e) {
      this.$emit('focus', e, this.value)
    },
    add () {
      if (!this.addable) return
      if (this.value === null) {
        this.emitChangeEvent(this.createValidValue())
      } else {
        const valueAfterChange = this.adjustValue(this.value + this.safeStep)
        this.emitChangeEvent(valueAfterChange)
      }
    },
    minus () {
      if (!this.minusable) return
      if (this.value === null) {
        this.emitChangeEvent(this.createValidValue())
      } else {
        const valueAfterChange = this.adjustValue(this.value - this.safeStep)
        this.emitChangeEvent(valueAfterChange)
      }
    },
    handleEnter (e) {
      const value = this.adjustValue(this.$refs.input.value)
      this.$refs.input.value = value
      this.emitChangeEvent(value)
    },
    adjustValue (value) {
      value = String(value).trim() || ''
      if (value.trim() === '') {
        value = null
      } else if (Number.isNaN(Number(value))) {
        value = this.value
      } else {
        value = Number(value)
      }
      if (value === null) {
        return null
      }
      if (this.validator) {
        if (this.validator(value)) {
          return value
        } else {
          return null
        }
      } else {
        if (this.safeMin !== null && value < this.safeMin) value = this.safeMin
        else if (this.safeMax !== null && value > this.safeMax) { value = this.safeMax }
      }
      return value
    },
    handleBlur (e) {
      const value = this.adjustValue(e.target.value)
      e.target.value = value
      this.emitChangeEvent(value)
      this.$emit('blur', value)
    }
  }
}
</script>
