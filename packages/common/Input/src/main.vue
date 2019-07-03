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
      @input="handleInput"
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
      type="text"
      class="n-input__input"
      :class="{
        [`n-input__input--${size}-size`]: true,
        [`n-input__input--round`]: round,
        [`n-input__input--icon`]: icon
      }"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled === true"
      @input="handleInput"
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
      type: String,
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
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}
</script>
