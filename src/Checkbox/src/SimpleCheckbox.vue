<template>
  <div
    class="n-checkbox"
    :class="{
      'n-checkbox--checked': checked,
      'n-checkbox--disabled': disabled,
      'n-checkbox--indeterminate': indeterminate,
      [`n-${theme}-theme`]: theme
    }"
    :tabindex="disabled ? false : 0"
    @keyup.enter="handleKeyUpEnter"
    @keyup.space="handleKeyUpSpace"
    @keydown.space="handleKeyDownSpace"
  >
    <div
      class="n-checkbox-box"
      @click="handleClick"
    >
      <check-mark class="n-checkbox-box__check-mark" />
      <line-mark class="n-checkbox-box__line-mark" />
    </div>
  </div>
</template>

<script>
import CheckMark from './CheckMark'
import LineMark from './LineMark'
import createValidator from '../../_utils/vue/validateProp'

export default {
  name: 'NSimpleCheckbox',
  components: {
    CheckMark,
    LineMark
  },
  model: {
    prop: 'checked',
    event: 'chanage'
  },
  props: {
    value: {
      validator: createValidator(['number', 'boolean', 'string']),
      default: null
    },
    checked: {
      validator: createValidator(['boolean']),
      default: false
    },
    disabled: {
      validator: createValidator(['boolean']),
      default: false
    },
    indeterminate: {
      validator: createValidator(['boolean']),
      default: false
    },
    theme: {
      validator: createValidator(['string']),
      default: null
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
      if (!this.disabled) {
        this.toggle()
      }
    },
    handleKeyUpEnter (e) {
      if (!this.disabled) {
        this.toggle()
      }
    },
    toggle () {
      this.$emit('change', !this.checked, this.checked)
    },
    handleKeyDownSpace (e) {
      e.preventDefault()
    },
    handleKeyUpSpace (e) {
      this.handleKeyUpEnter()
    }
  }
}
</script>
