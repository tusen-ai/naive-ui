<template>
  <div class="n-transfer-list-header__extra">
    {{
      source ?
        NTransfer.sourceCheckedValues.length :
        NTransfer.targetCheckedValues.length
    }} / {{
      source ?
        NTransfer.memorizedSourceOptions.length :
        NTransfer.targetOptions.length
    }}
  </div>
</template>

<script>
import createValidator from '../../../utils/validateProp'

export default {
  name: 'NTransferHeaderExtra',
  props: {
    source: {
      validator: createValidator(['boolean']),
      default: false
    }
  },
  inject: {
    NTransfer: {
      default: null
    }
  }
}
</script>
