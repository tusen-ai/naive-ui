<template>
  <div
    v-if="type==='textarea'"
    class="n-input"
    :class="{
      'is-disabled': disabled
    }"
  >
    <textarea
      class="n-input__textarea"
      :class="{
        [`n-input__textarea--${size}-size`]: true
      }"
      :rows="rows"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled === true"
      v-on="$listeners"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @keyup="handleKeyUp"
    />
  </div>
  <div
    v-else
    class="n-input"
    :class="{
      'is-disabled': disabled
    }"
  >
    <input
      :type="type"
      class="n-input__input"
      :class="{
        [`n-input__input--${size}-size`]: true,
        [`n-input__input--round`]: round,
        [`n-input__input--icon`]: icon
      }"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled === true"
      :maxlength="maxlength"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @keyup="handleKeyUp"
    >
    <div
      v-if="icon"
      class="n-input__icon"
    >
      <n-icon :type="icon" />
    </div>
  </div>
</template>

<script>
import nIcon from '../../Icon'

export default {
  name: 'NInput',
  components: {
    nIcon
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    rows: {
      type: [Number, String],
      default: 3
    },
    round: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    maxlength: {
      type: [String, Number],
      default: 'false'
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    },
    handleBlur (e) {
      this.$emit('blur', e)
    },
    handleFocus (e) {
      this.$emit('focus', e)
    },
    handleKeyUp (e) {
      this.$emit('keyup', e)
    }
  }
}
</script>
