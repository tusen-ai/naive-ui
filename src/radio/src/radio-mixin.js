import { warn } from '../../_utils/naive/warn'

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
      type: Function,
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
    syntheticName () {
      if (this.name !== undefined) return this.name
      if (this.NRadioGroup) return this.NRadioGroup.name
    },
    syntheticDisabled () {
      if (this.NRadioGroup && this.NRadioGroup.disabled) return true
      if (this.disabled) return true
      return false
    },
    syntheticAscendantBackgroundColor () {
      const NRadioGroup = this.NRadioGroup
      if (NRadioGroup && NRadioGroup.syntheticTheme === 'dark') {
        return NRadioGroup.ascendantBackgroundColor
      }
      return null
    }
  },
  methods: {
    toggle () {
      if (this.syntheticDisabled) return
      if (this.checkedValue !== this.value) {
        this.emitChangeEvent()
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
      if (this.syntheticDisabled) return
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
    },
    emitChangeEvent () {
      const {
        value
      } = this
      if (this.NRadioGroup) {
        const {
          onChange,
          'onUpdate:value': updateValue,
          __triggerFormInput,
          __triggerFormChange
        } = this.NRadioGroup
        if (updateValue) updateValue(value)
        if (onChange) onChange(value) // deprecated
        __triggerFormInput()
        __triggerFormChange()
      } else {
        const {
          onChange,
          'onUpdate:checkedValue': updateCheckedValue,
          __triggerFormInput,
          __triggerFormChange
        } = this
        if (updateCheckedValue) updateCheckedValue(value)
        if (onChange) onChange(value) // deprecated
        __triggerFormInput()
        __triggerFormChange()
      }
    }
  }
}
