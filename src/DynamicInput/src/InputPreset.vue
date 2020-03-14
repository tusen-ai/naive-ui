<template>
  <div
    class="n-dynamic-input-preset-input"
  >
    <n-input
      :value="value"
      :placeholder="NDynamicInput.placeholder"
      @input="handleInput"
    />
  </div>
</template>

<script>
export default {
  name: 'NDynamicInputInputPreset',
  inject: {
    NDynamicInput: {
      default: null
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    parentPath: {
      type: String,
      default: null
    },
    path: {
      type: String,
      default: null
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>
