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
import createValidator from '../../_utils/vue/validateProp'

export default {
  name: 'NTransferHeaderCheckbox',
  components: {
    NCheckbox
  },
  props: {
    theme: {
      validator: createValidator(['string']),
      default: null
    },
    source: {
      validator: createValidator(['boolean']),
      default: false
    },
    onChange: {
      validator: createValidator(['function']),
      required: true
    }
  },
  inject: {
    NTransfer: {
      default: null
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
