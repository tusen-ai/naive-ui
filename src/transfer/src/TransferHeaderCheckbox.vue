<template>
  <n-checkbox
    :unstable-theme="NTransfer.mergedTheme.peers.Checkbox"
    :unstable-theme-overrides="NTransfer.mergedTheme.overrides.Checkbox"
    :checked="checkboxProps.checked"
    :indeterminate="checkboxProps.indeterminate"
    :disabled="checkboxProps.disabled || NTransfer.disabled"
    :size="NTransfer.mergedSize"
    @update:checked="onChange"
  />
</template>

<script>
import { defineComponent } from 'vue'
import { NCheckbox } from '../../checkbox'

export default defineComponent({
  name: 'NTransferHeaderCheckbox',
  components: {
    NCheckbox
  },
  inject: {
    NTransfer: {
      default: null
    }
  },
  props: {
    source: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function,
      required: true
    }
  },
  computed: {
    checkboxProps () {
      const { NTransfer, source } = this
      if (source) {
        return NTransfer.srcCheckedStatus
      } else {
        return NTransfer.tgtCheckedStatus
      }
    }
  }
})
</script>
