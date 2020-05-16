<template>
  <div
    class="n-dynamic-input-preset-pair"
  >
    <n-input
      :value="value.key"
      class="n-dynamic-input-pair-input"
      :placeholder="NDynamicInput.keyPlaceholder"
      @input="handleKeyInput"
    />
    <n-input
      :value="value.value"
      class="n-dynamic-input-pair-input"
      :placeholder="NDynamicInput.valuePlaceholder"
      @input="handleValueInput"
    />
  </div>
</template>

<script>
import NInput from '../../Input'

export default {
  name: 'NDynamicInputPairPreset',
  components: {
    NInput
  },
  inject: {
    NDynamicInput: {
      default: null
    }
  },
  props: {
    value: {
      type: Object,
      default: () => ({
        key: null,
        value: null
      })
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
    handleKeyInput (key) {
      this.$emit('input', {
        key,
        value: this.value.value
      })
    },
    handleValueInput (value) {
      this.$emit('input', {
        key: this.value.key,
        value
      })
    }
  }
}
</script>
