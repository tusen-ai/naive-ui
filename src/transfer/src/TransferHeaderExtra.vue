<template>
  <div class="n-transfer-list-header__extra">
    {{
      source ?
        NTransfer.srcCheckedValues.length :
        NTransfer.tgtCheckedValues.length
    }}/{{
      source ?
        NTransfer.srcOpts.length :
        NTransfer.tgtOpts.length
    }}
  </div>
</template>

<script>
import createValidator from '../../_utils/vue/validateProp'

export default {
  name: 'NTransferHeaderExtra',
  inject: {
    NTransfer: {
      default: null
    }
  },
  props: {
    source: {
      validator: createValidator(['boolean']),
      default: false
    }
  }
}
</script>
