import { warn, call } from '../../_utils'

export default {
  props: {
    name: {
      type: String,
      default: undefined
    },
    value: {
      type: [Boolean, String, Number],
      default: null
    },
    checkedValue: {
      type: [Boolean, String, Number],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function,
      default: undefined
    },
    'onUpdate:checkedValue': {
      type: [Function, Array],
      default: undefined
    },
    // deprecated
    onChange: {
      validator () {
        if (__DEV__) warn('radio', '`on-change` is deprecated, please use `on-update:checked-value` instead.')
        return true
      },
      default: undefined
    }
  },
  data () {
    return {
      focus: false
    }
  },
  computed: {
    mergedName () {
      if (this.name !== undefined) return this.name
      if (this.NRadioGroup) return this.NRadioGroup.name
    },
    mergedDisabled () {
      if (this.NRadioGroup && this.NRadioGroup.disabled) return true
      if (this.disabled) return true
      return false
    },
    syntheticAscendantBackgroundColor () {
      const NRadioGroup = this.NRadioGroup
      if (NRadioGroup && NRadioGroup.mergedTheme === 'dark') {
        return NRadioGroup.ascendantBackgroundColor
      }
      return null
    }
  },
  methods: {
    doUpdateValue () {
      const {
        value
      } = this
      if (this.NRadioGroup) {
        const {
          onChange,
          'onUpdate:value': updateValue,
          nTriggerFormInput,
          nTriggerFormChange
        } = this.NRadioGroup
        if (updateValue) call(updateValue, value)
        if (onChange) call(onChange, value) // deprecated
        nTriggerFormInput()
        nTriggerFormChange()
      } else {
        const {
          onChange,
          'onUpdate:checkedValue': updateCheckedValue,
          nTriggerFormInput,
          nTriggerFormChange
        } = this
        if (updateCheckedValue) call(updateCheckedValue, value)
        if (onChange) call(onChange, value) // deprecated
        nTriggerFormInput()
        nTriggerFormChange()
      }
    },
    toggle () {
      if (this.mergedDisabled) return
      if (this.checkedValue !== this.value) {
        this.doUpdateValue()
      }
    },
    handleRadioInputChange () {
      this.toggle()
    },
    handleRadioInputBlur () {
      this.focus = false
    },
    handleRadioInputFocus () {
      this.focus = true
    },
    handleKeyUpEnter () {
      this.toggle()
    },
    handleMouseDown () {
      if (this.mergedDisabled) return
      setTimeout(() => {
        if (!this.$el.contains(document.activeElement)) {
          this.$refs.input.focus()
        }
      }, 0)
    },
    handleClick (e) {
      const {
        onClick
      } = this
      if (onClick) onClick(e)
      this.toggle()
    }
  }
}
