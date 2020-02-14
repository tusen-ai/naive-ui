<template>
  <div
    class="n-radio-button"
    :class="{
      'n-radio-button--disabled': syntheticDisabled,
      'n-radio-button--checked': syntheticChecked,
      'n-radio-button--focus': focus
    }"
    @keyup.enter="handleKeyUpEnter"
    @click="handleClick"
  >
    <input
      ref="input"
      type="radio"
      class="n-radio-button__radio-input"
      :checked="syntheticChecked"
      :disabled="syntheticDisabled"
      @change="handleRadioInputChange"
      @focus="handleRadioInputFocus"
      @blur="handleRadioInputBlur"
    >
    <div class="n-radio-button__border-mask" />
    <slot />
  </div>
</template>

<script>
import radioMixin from './radioMixin'

export default {
  name: 'NRadioButton',
  mixins: [radioMixin],
  model: {
    prop: 'checkedValue',
    event: 'change'
  },
  inject: {
    NRadioGroup: {
      default: null
    }
  },
  props: {
    value: {
      type: [Boolean, String, Number],
      default: null
    },
    checkedValue: {
      type: [Boolean, String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    syntheticChecked () {
      if (this.NRadioGroup) {
        return this.NRadioGroup.value === this.value
      } else {
        return this.checkedValue === this.value
      }
    },
    syntheticDisabled () {
      if (this.NRadioGroup && this.NRadioGroup.disabled) return true
      if (this.disabled) return true
      return false
    }
  },
  created () {
    this.NRadioGroup && this.NRadioGroup.radioButtonCount++
  },
  beforeDestroy () {
    this.NRadioGroup && this.NRadioGroup.radioButtonCount--
  },
  methods: {
    handleKeyUpEnter () {
      this.toggle()
    },
    handleClick () {
      this.toggle()
    },
    emitChangeEvent () {
      if (this.NRadioGroup) {
        this.NRadioGroup.$emit('change', this.value)
      } else {
        this.$emit('change', this.value)
      }
    }
  }
}
</script>
