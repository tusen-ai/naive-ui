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
    }
  },
  model: {
    prop: 'checkedValue',
    event: 'change'
  },
  inject: {
    NRadioGroup: {
      default: null
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
    syntheticChecked () {
      if (this.NRadioGroup) {
        return this.NRadioGroup.value === this.value
      } else {
        return this.checkedValue === this.value
      }
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
    handleMouseDown (e) {
      if (this.syntheticDisabled) return
      // e.preventDefault()
      this.$refs.input.focus()
    },
    handleClick (e) {
      this.$emit('click', e)
      this.toggle()
    },
    emitChangeEvent () {
      if (this.NRadioGroup) {
        this.NRadioGroup.$emit('change', this.value)
      } else {
        this.$emit('change', this.value)
      }
    }
  }
}
