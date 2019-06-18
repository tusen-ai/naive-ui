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
        [`n-input__input--${size}-size`]: true
      }"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled === true"
      @input="handleInput"
    >
  </div>
</template>

<script>
export default {
  name: 'NInput',
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
      type: Number,
      default: 3
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}
</script>
