<template>
  <n-checkbox
    :theme="theme"
    :checked="checkboxProps.checked"
    :indeterminate="checkboxProps.indeterminate"
    :disabled="checkboxProps.disabled"
    :size="NTransfer.mergedSize"
    @update:checked="onChange"
  />
</template>

<script>
import NCheckbox from '../../checkbox/src/Checkbox.vue'

export default {
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
    theme: {
      validator: String,
      default: null
    },
    source: {
      validator: Boolean,
      default: false
    },
    onChange: {
      validator: Function,
      required: true
    }
  },
  computed: {
    checkboxProps () {
      const {
        NTransfer,
        source
      } = this
      if (source) {
        return NTransfer.srcCheckedStatus
      } else {
        return NTransfer.tgtCheckedStatus
      }
    }
  }
}
</script>
