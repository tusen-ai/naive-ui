<template>
  <div
    class="n-dynamic-input-preset-input"
  >
    <n-input
      :value="value"
      :placeholder="NDynamicInput.placeholder"
      @update:value="handleInput"
    />
  </div>
</template>

<script>
import NInput from '../../input'

export default {
  name: 'DynamicInputInputPreset',
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
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: Function,
      required: true
    }
  },
  methods: {
    handleInput (value) {
      this['onUpdate:value'](value)
    }
  }
}
</script>
