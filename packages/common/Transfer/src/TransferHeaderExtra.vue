<template>
  <div class="n-transfer-list-header__extra">
    {{
      source ?
        NTransfer.sourceCheckedValues.length :
        NTransfer.targetCheckedValues.length
    }} / {{
      source ?
        (
          NTransfer.nextSourceOptionsLength === null ?
            NTransfer.memorizedSourceOptions.length :
            NTransfer.nextSourceOptionsLength
        ) :
        (
          NTransfer.nextTargetOptionsLength === null ?
            NTransfer.targetOptions.length :
            NTransfer.nextTargetOptionsLength
        )
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
