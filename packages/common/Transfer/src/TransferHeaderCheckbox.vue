<template>
  <n-simple-checkbox
    :theme="theme"
    :checked="checked"
    :indeterminate="indeterminate"
    :disabled="disabled"
    @change="handleChange"
  />
</template>

<script>
import NSimpleCheckbox from '../../Checkbox/src/SimpleCheckbox'
import createValidator from '../../../utils/validateProp'

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
    }
  },
  inject: {
    NTransfer: {
      default: null
    }
  },
  computed: {
    checked () {
      if (this.source) return this.NTransfer.sourceHeaderCheckboxChecked
      return this.NTransfer.targetHeaderCheckboxChecked
    },
    disabled () {
      if (this.source) return this.NTransfer.sourceHeaderCheckboxDisabled
      return this.NTransfer.targetHeaderCheckboxDisabled
    },
    indeterminate () {
      if (this.source) return this.NTransfer.sourceHeaderCheckboxIndeterminate
      return this.NTransfer.targetHeaderCheckboxIndeterminate
    }
  },
  methods: {
    handleChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>
