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
import { NCheckbox } from '../../checkbox'

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
      type: String,
      default: null
    },
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
}
</script>
