<template>
  <div
    class="n-transfer-list-item n-transfer-list-item--target"
    :class="{
      'n-transfer-list-item--disabled': disabled,
    }"
    @click="handleClick"
  >
    <div class="n-transfer-list-item__checkbox">
      <n-simple-checkbox
        :theme="NTransfer.mergedTheme"
        :disabled="disabled"
        :checked="checked"
        :size="NTransfer.mergedSize"
      />
    </div>
    <div
      class="n-transfer-list-item__label"
    >
      {{ label }}
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import NSimpleCheckbox from '../../checkbox/src/SimpleCheckbox.vue'
import createValidator from '../../_utils/vue/validateProp'
import { useMemo } from '../../_utils/composition'

export default {
  name: 'NTransferListItem',
  components: {
    NSimpleCheckbox
  },
  props: {
    label: {
      validator: createValidator(['string']),
      required: true
    },
    value: {
      validator: createValidator(['string', 'number']),
      required: true
    },
    disabled: {
      validator: createValidator(['boolean']),
      default: false
    }
  },
  inject: {
    NTransfer: {
      default: null
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
}
</script>
