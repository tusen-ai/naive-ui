<template>
  <div
    class="n-input-number"
    :class="{
      [`n-input-number--${mergedSize}-size`]: true,
      'n-input-number--disabled': disabled,
      'n-input-number--invalid': invalid,
      [`n-${mergedTheme}-theme`]: mergedTheme
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
      :placeholder="mergedPlaceholder"
      :value="value"
      :disabled="disabled ? 'disabled' : false"
      @focus="doFocus"
      @blur="doBlur"
      @keyup.enter="handleEnter"
    >
    <div class="n-input-number__border-mask" />
  </div>
</template>

<script>
import NIcon from '../../icon/index'
import {
  RemoveIcon,
  AddIcon
} from '../../_base/icons'
import {
  configurable,
  themeable,
  asformitem,
  usecssr,
  locale
} from '../../_mixins'
import { warn, call } from '../../_utils'
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
    configurable,
    themeable,
    locale('InputNumber'),
    asformitem(),
    usecssr(styles)
  ],
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
      type: [Function, Array],
      default: undefined
    },
    onFocus: {
      type: [Function, Array],
      default: undefined
    },
    onBlur: {
      type: [Function, Array],
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
    mergedPlaceholder () {
      const {
        placeholder
      } = this
      if (placeholder !== undefined) return placeholder
      return this.localeNs.placeholder
    },
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
    doUpdateValue (value) {
      if (value !== this.value) {
        const {
          'onUpdate:value': onUpdateValue,
          onChange,
          nTriggerFormInput,
          nTriggerFormChange
        } = this
        if (onChange) call(onChange, value)
        if (onUpdateValue) call(onUpdateValue, value)
        nTriggerFormInput()
        nTriggerFormChange()
      }
    },
    doFocus (e) {
      const {
        onFocus,
        nTriggerFormFocus
      } = this
      if (onFocus) call(onFocus, e)
      nTriggerFormFocus()
    },
    doBlur (e) {
      const value = this.adjustValue(e.target.value)
      e.target.value = value
      this.doUpdateValue(value)
      const {
        onBlur,
        nTriggerFormBlur
      } = this
      if (onBlur) call(onBlur, e)
      nTriggerFormBlur()
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
    add () {
      if (!this.addable) return
      if (this.value === null) {
        this.doUpdateValue(this.createValidValue())
      } else {
        const valueAfterChange = this.adjustValue(this.value + this.safeStep)
        this.doUpdateValue(valueAfterChange)
      }
    },
    minus () {
      if (!this.minusable) return
      if (this.value === null) {
        this.doUpdateValue(this.createValidValue())
      } else {
        const valueAfterChange = this.adjustValue(this.value - this.safeStep)
        this.doUpdateValue(valueAfterChange)
      }
    },
    handleEnter (e) {
      const value = this.adjustValue(this.$refs.input.value)
      this.$refs.input.value = value
      this.doUpdateValue(value)
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
    }
  }
}
</script>
