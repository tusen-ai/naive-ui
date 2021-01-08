<template>
  <div class="n-transfer-list-header__extra">
    {{
      source
        ? NTransfer.srcCheckedValues.length
        : NTransfer.tgtCheckedValues.length
    }}/{{ source ? NTransfer.srcOpts.length : NTransfer.tgtOpts.length }}
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NTransferHeaderExtra',
  inject: {
    NTransfer: {
      default: null
    }
  },
  props: {
    source: {
      type: Boolean,
      default: false
    }
  }
})
</script>
