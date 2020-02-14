export default {
  data () {
    return {
      focus: false
    }
  },
  methods: {
    toggle () {
      if (this.syntheticDisabled) return
      this.$refs.input.focus()
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
    }
  }
}
