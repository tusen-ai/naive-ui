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
    checked: {
      type: Boolean,
      default: undefined
    },
    defaultChecked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function,
      default: undefined
    },
    'onUpdate:checked': {
      type: [Function, Array],
      default: undefined
    },
    // deprecated
    checkedValue: {
      validator () {
        warn(
          'radio',
          '`checked-value` is deprecated, please use `checked` instead.'
        )
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
      const { NRadioGroup } = this
      return (NRadioGroup && NRadioGroup.disabled) || this.disabled
    }
  },
  methods: {
    doUpdateChecked () {
      const { NRadioGroup } = this
      if (NRadioGroup) {
        const {
          'onUpdate:value': updateValue,
          nTriggerFormInput,
          nTriggerFormChange
        } = NRadioGroup
        const { value } = this
        if (updateValue) call(updateValue, value)
        nTriggerFormInput()
        nTriggerFormChange()
      } else {
        const {
          'onUpdate:checked': updateChecked,
          nTriggerFormInput,
          nTriggerFormChange
        } = this
        if (updateChecked) call(updateChecked, true)
        nTriggerFormInput()
        nTriggerFormChange()
        this.uncontrolledChecked = true
      }
    },
    toggle () {
      if (this.mergedDisabled) return
      if (!this.renderSafeChecked) {
        this.doUpdateChecked()
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
      this.$refs.input.click()
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
      const { onClick } = this
      if (onClick) onClick(e)
      this.$refs.input.click()
    }
  }
}
