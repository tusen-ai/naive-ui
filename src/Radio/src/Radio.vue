<template>
  <div
    class="n-radio"
    :class="{
      'n-radio--disabled': syntheticDisabled,
      'n-radio--checked': syntheticChecked,
      'n-radio--focus': focus,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
    @keyup.enter="handleKeyUpEnter"
    @click="handleClick"
  >
    <input
      ref="input"
      type="radio"
      class="n-radio__radio-input"
      :checked="syntheticChecked"
      :disabled="syntheticDisabled"
      @change="handleRadioInputChange"
      @focus="handleRadioInputFocus"
      @blur="handleRadioInputBlur"
    >
    <div
      class="n-radio__control"
      :class="{
        'n-radio__control--checked': syntheticChecked
      }"
    />
    <div class="n-radio__label">
      <slot />
    </div>
  </div>
</template>

<script>
import asformitem from '../../_mixins/asformitem'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import radioMixin from './radioMixin'

export default {
  name: 'NRadio',
  mixins: [ withapp, themeable, asformitem(), radioMixin ],
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
      default: undefined
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
  methods: {
    handleKeyUpEnter () {
      this.toggle()
    },
    handleClick (e) {
      this.$emit('click', e)
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
