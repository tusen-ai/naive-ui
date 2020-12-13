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
      :value="mergedValue"
      :disabled="disabled ? 'disabled' : false"
      @focus="doFocus"
      @blur="doBlur"
      @keyup.enter="handleEnter"
    >
    <div class="n-input-number__border" />
    <div class="n-input-number__border-mask" />
  </div>
</template>

<script>
import { ref, toRef } from 'vue'
import { useMergedState } from 'vooks'
import { NIcon } from '../../icon'
import { RemoveIcon, AddIcon } from '../../_base/icons'
import {
  configurable,
  themeable,
  asFormItem,
  withCssr,
  locale
} from '../../_mixins'
import { warn, call } from '../../_utils'
import styles from './styles'

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
    asFormItem(),
    withCssr(styles)
  ],
  props: {
    placeholder: {
      type: String,
      default: undefined
    },
    defaultValue: {
      type: Number,
      default: null
    },
    value: {
      type: Number,
      default: undefined
    },
    step: {
      type: [Number, String],
      default: 1
    },
    min: {
      type: [Number, String],
      default: undefined
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
        if (__DEV__) {
          warn(
            'input-number',
            '`on-change` is deprecated, please use `on-update:value` instead.'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    return {
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef
    }
  },
  computed: {
    mergedPlaceholder () {
      const { placeholder } = this
      if (placeholder !== undefined) return placeholder
      return this.localeNs.placeholder
    },
    mergedStep () {
      const parsedNumber = parseNumber(this.step)
      if (parsedNumber !== null) {
        return parsedNumber === 0 ? 1 : Math.abs(parsedNumber)
      }
      return 1
    },
    mergedMin () {
      const parsedNumber = parseNumber(this.min)
      if (parsedNumber !== null) return parsedNumber
      else return null
    },
    mergedMax () {
      const parsedNumber = parseNumber(this.max)
      if (parsedNumber !== null) return parsedNumber
      else return null
    },
    invalid () {
      const { mergedValue } = this
      if (mergedValue === null) return false
      const { validator } = this
      if (validator && !validator(mergedValue)) return true
      const { mergedMin } = this
      if (mergedMin !== null && mergedValue < mergedMin) return true
      const { mergedMax } = this
      if (mergedMax !== null && mergedValue > mergedMax) return true
      return false
    },
    minusable () {
      const { mergedValue, validator } = this
      if (validator) {
        if (mergedValue !== null) return validator(mergedValue - this.step)
        else return false
      } else {
        return !(
          mergedValue !== null &&
          this.mergedMin !== null &&
          mergedValue <= this.mergedMin
        )
      }
    },
    addable () {
      const { mergedValue, validator } = this
      if (validator) {
        if (mergedValue !== null) return validator(mergedValue + this.step)
        else return false
      } else {
        return !(
          mergedValue !== null &&
          this.mergedMax !== null &&
          mergedValue >= this.mergedMax
        )
      }
    }
  },
  methods: {
    doUpdateValue (value) {
      const { mergedValue } = this
      if (value === mergedValue) return
      const {
        'onUpdate:value': onUpdateValue,
        onChange,
        nTriggerFormInput,
        nTriggerFormChange
      } = this
      if (onChange) call(onChange, value)
      if (onUpdateValue) call(onUpdateValue, value)
      this.uncontrolledValue = value
      nTriggerFormInput()
      nTriggerFormChange()
    },
    doFocus (e) {
      const { onFocus, nTriggerFormFocus } = this
      if (onFocus) call(onFocus, e)
      nTriggerFormFocus()
    },
    doBlur (e) {
      const value = this.sanitizeValue(e.target.value)
      e.target.value = value
      this.doUpdateValue(value)
      const { onBlur, nTriggerFormBlur } = this
      if (onBlur) call(onBlur, e)
      nTriggerFormBlur()
    },
    createValidValue () {
      if (this.validator) return null
      if (this.mergedMin !== null) {
        return Math.max(0, this.mergedMin)
      } else if (this.mergedMax !== null) {
        return Math.min(0, this.mergedMax)
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
      const { mergedValue } = this
      if (mergedValue === null) {
        this.doUpdateValue(this.createValidValue())
      } else {
        const valueAfterChange = this.sanitizeValue(
          mergedValue + this.mergedStep
        )
        this.doUpdateValue(valueAfterChange)
      }
    },
    minus () {
      if (!this.minusable) return
      const { mergedValue } = this
      if (mergedValue === null) {
        this.doUpdateValue(this.createValidValue())
      } else {
        const valueAfterChange = this.sanitizeValue(
          mergedValue - this.mergedStep
        )
        this.doUpdateValue(valueAfterChange)
      }
    },
    handleEnter (e) {
      const value = this.sanitizeValue(this.$refs.input.value)
      this.$refs.input.value = value
      this.doUpdateValue(value)
    },
    sanitizeValue (value) {
      value = String(value).trim() || ''
      if (value.trim() === '') {
        value = null
      } else if (Number.isNaN(Number(value))) {
        value = this.mergedValue
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
        if (this.mergedMin !== null && value < this.mergedMin) { value = this.mergedMin } else if (this.mergedMax !== null && value > this.mergedMax) {
          value = this.mergedMax
        }
      }
      return value
    }
  }
}
</script>
