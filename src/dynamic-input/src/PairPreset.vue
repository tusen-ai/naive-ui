<template>
  <div class="n-dynamic-input-preset-pair">
    <n-input
      :unstable-theme="NDynamicInput.mergedTheme.peers.Input"
      :unstable-theme-overrides="NDynamicInput.mergedTheme.overrides.Input"
      :value="value.key"
      class="n-dynamic-input-pair-input"
      :placeholder="NDynamicInput.keyPlaceholder"
      @update:value="handleKeyInput"
    />
    <n-input
      :unstable-theme="NDynamicInput.mergedTheme.peers.Input"
      :unstable-theme-overrides="NDynamicInput.mergedTheme.overrides.Input"
      :value="value.value"
      class="n-dynamic-input-pair-input"
      :placeholder="NDynamicInput.valuePlaceholder"
      @update:value="handleValueInput"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { NInput } from '../../input'

export default defineComponent({
  name: 'DynamicInputPairPreset',
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
      default: undefined
    },
    path: {
      type: String,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: Function,
      required: true
    }
  },
  methods: {
    handleKeyInput (key) {
      this['onUpdate:value']({
        key,
        value: this.value.value
      })
    },
    handleValueInput (value) {
      this['onUpdate:value']({
        key: this.value.key,
        value
      })
    }
  }
})
</script>
