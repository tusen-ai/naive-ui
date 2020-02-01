<template>
  <li
    class="n-transfer-list-item n-transfer-list-item--source"
    :class="{
      'n-transfer-list-item--disabled': disabled,
      'n-transfer-list-item--enter': enableEnterAnimation
    }"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="n-transfer-list-item__checkbox">
      <n-simple-checkbox
        :theme="NTransfer.synthesizedTheme"
        :disabled="disabled"
        :checked="checked"
      />
    </div>
    <div
      class="n-transfer-list-item__label"
    >
      {{ label }}
    </div>
  </li>
</template>

<script>
import NSimpleCheckbox from '../../Checkbox/src/SimpleCheckbox'
import createValidator from '../../../utils/validateProp'

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
    },
    index: {
      validator: createValidator(['number']),
      required: true
    }
  },
  inject: {
    NTransfer: {
      default: null
    }
  },
  data () {
    return {
      checked: false,
      enableEnterAnimation: false
    }
  },
  created () {
    if (this.NTransfer.initialized && this.NTransfer.enableSourceEnterAnimation) {
      this.enableEnterAnimation = true
    }
  },
  methods: {
    setChecked (checked) {
      if (!this.disabled && this.checked !== checked) {
        this.checked = checked
      }
    },
    handleClick () {
      if (!this.disabled) {
        const newCheckedStatus = !this.checked
        this.checked = newCheckedStatus
        this.$emit('click', newCheckedStatus, this.value)
      }
    },
    handleMouseEnter (e) {
      if (!this.disabled) {
        this.$emit('mouseenter', e)
      }
    },
    handleMouseLeave (e) {
      if (!this.disabled) {
        this.$emit('mouseleave', e)
      }
    },
    leave () {
      if (this.$el && this.$el.classList) this.$el.classList.add('n-transfer-list-item--leave')
    }
  }
}
</script>
