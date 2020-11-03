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
export default {
  name: 'NTransferHeaderExtra',
  inject: {
    NTransfer: {
      default: null
    }
  },
  props: {
    source: {
      validator: Boolean,
      default: false
    }
  }
}
</script>
