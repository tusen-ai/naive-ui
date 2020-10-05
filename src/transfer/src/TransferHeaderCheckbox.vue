<template>
  <n-simple-checkbox
    :theme="theme"
    :checked="checkboxProps.checked"
    :indeterminate="checkboxProps.indeterminate"
    :disabled="checkboxProps.disabled"
    :size="NTransfer.mergedSize"
    @change="onChange"
  />
</template>

<script>
import NSimpleCheckbox from '../../checkbox/src/SimpleCheckbox.vue'
import createValidator from '../../_utils/vue/validateProp'

export default {
  name: 'NTransferHeaderCheckbox',
  components: {
    NSimpleCheckbox
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
