<template>
  <div
    class="n-input-number"
    :class="{
      [`n-input-number--${mergedSize}-size`]: true,
      'n-input-number--disabled': disabled,
      'n-input-number--invalid': invalid,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
  >
    <button
      tabindex="-1"
      type="button"
      class="n-input-number__minus-button n-input-number__button"
      :class="{
        [`n-input-number__button--disabled`]: !minusable
      }"
      @mousedown="handleMouseDown"
      @click="minus"
    >
      <div class="n-input-number-button-boundary" />
      <div class="n-input-number-button-body">
        <n-icon>
          <remove-icon />
        </n-icon>
      </div>
      <div class="n-input-number-button-border-mask" />
    </button>
    <button
      tabindex="-1"
      type="button"
      class="n-input-number__add-button n-input-number__button"
      :class="{
        [`n-input-number__button--disabled`]: !addable
      }"
      @mousedown="handleMouseDown"
      @click="add"
    >
      <div class="n-input-number-button-body">
        <n-icon>
          <add-icon />
        </n-icon>
      </div>
      <div class="n-input-number-button-boundary" />
      <div class="n-input-number-button-border-mask" />
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
    <div class="n-input-number__border-mask" />
  </div>
</template>

<script>
import NIcon from '../../icon/index'
import RemoveIcon from '../../_icons/remove-outline.vue'
import AddIcon from '../../_icons/add-outline.vue'
import themeable from '../../_mixins/themeable'
import withapp from '../../_mixins/withapp'
import asformitem from '../../_mixins/asformitem'
import usecssr from '../../_mixins/usecssr'
import { warn } from '../../_utils/naive/warn'
import styles from './styles'

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
  name: 'InputNumber',
  components: {
    NIcon,
    RemoveIcon,
    AddIcon
  },
  mixins: [
    withapp,
    themeable,
    asformitem(),
    usecssr(styles)
  ],
  inject: {
    NFormItem: {
      default: null
    }
  },
  props: {
    placeholder: {
      type: String,
      default: undefined
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
      default: undefined
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    validator: {
      type: Function,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: Function,
      default: undefined
    },
    onFocus: {
      type: Function,
      default: undefined
    },
    onBlur: {
      type: Function,
      default: undefined
    },
    // deprecated
    onChange: {
      validator () {
        if (__DEV__) warn('input-number', '`on-change` is deprecated, please use `on-update:value` instead.')
        return true
      },
      default: undefined
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
        const {
          'onUpdate:value': onUpdateValue,
          onChange,
          __triggerFormInput,
          __triggerFormChange
        } = this
        if (onChange) onChange(value)
        if (onUpdateValue) onUpdateValue(value)
        __triggerFormInput()
        __triggerFormChange()
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
      const {
        onFocus,
        __triggerFormFocus
      } = this
      if (onFocus) onFocus(e)
      __triggerFormFocus()
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
      const {
        onBlur,
        __triggerFormBlur
      } = this
      if (onBlur) onBlur(e)
      __triggerFormBlur()
    }
  }
}
</script>
