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
      rows="3"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      @input="handleInput"
    />
  </div>
  <div
    v-else
    class="n-input"
  >
    <input
      type="text"
      class="n-input__input"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
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
    }
  },
  methods: {
    handleInput (e) {
      console.log(e.target.value)
      this.$emit('change', e.target.value)
    }
  }
}
</script>
