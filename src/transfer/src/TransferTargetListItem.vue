<template>
  <div
    class="n-transfer-list-item n-transfer-list-item--target"
    :class="{
      'n-transfer-list-item--disabled': disabled
    }"
    @click="handleClick"
  >
    <div class="n-transfer-list-item__checkbox">
      <n-checkbox
        :theme="'light'"
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
import { inject, defineComponent } from 'vue'
import { useMemo } from 'vooks'
import { NCheckbox } from '../../checkbox'

export default defineComponent({
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
      checked: useMemo(() => {
        return NTransfer.tgtCheckedValues.includes(props.value)
      })
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.NTransfer.handleTgtCheckboxClick(!this.checked, this.value)
      }
    }
  }
})
</script>
