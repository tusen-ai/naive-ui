<template>
  <div
    class="n-transfer-list-item n-transfer-list-item--source"
    :class="{
      'n-transfer-list-item--disabled': disabled
    }"
    @click="handleClick"
  >
    <div class="n-transfer-list-item__checkbox">
      <n-checkbox
        :theme="NTransfer.mergedTheme"
        :disabled="disabled"
        :checked="checked"
        :size="NTransfer.mergedSize"
      />
    </div>
    <div class="n-transfer-list-item__label">
      {{ label }}
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import { NCheckbox } from '../../checkbox'
import { useMemo } from 'vooks'

export default {
  name: 'NTransferListItem',
  components: {
    NCheckbox
  },
  inject: {
    NTransfer: {
      default: null
    }
  },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const NTransfer = inject('NTransfer')
    return {
      checked: useMemo(() => NTransfer.srcCheckedValues.includes(props.value))
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.NTransfer.handleSrcCheckboxClick(!this.checked, this.value)
      }
    }
  }
}
</script>
