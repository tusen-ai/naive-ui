<script>
export default {
  name: 'NBaseSelectOption',
  inject: {
    NBaseSelectMenu: {
      default: null
    }
  },
  props: {
    label: {
      validator (value) {
        return typeof value === 'string'
      },
      required: true
    },
    value: {
      validator (value) {
        const type = typeof value
        return type === 'string' || type === 'number'
      },
      required: true
    },
    disabled: {
      validator (value) {
        return typeof value === 'boolean'
      },
      default: false
    },
    selected: {
      validator (value) {
        return typeof value === 'boolean'
      },
      default: false
    },
    index: {
      validator (value) {
        return typeof value === 'number'
      },
      required: true
    }
  },
  methods: {
    createOption () {
      return {
        label: this.label,
        value: this.value,
        disabled: this.disabled,
        index: this.index
      }
    },
    handleClick (e) {
      if (this.disabled) return
      this.NBaseSelectMenu.handleOptionClick(e, this.createOption())
    },
    handleMouseEnter (e) {
      if (this.disabled) return
      this.NBaseSelectMenu.handleOptionMouseEnter(e, this.createOption())
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'n-base-select-option',
      class: {
        'n-base-select-option--selected': this.selected,
        'n-base-select-option--disabled': this.disabled
      },
      on: {
        click: this.handleClick,
        mouseenter: this.handleMouseEnter
      }
    }, [ this.label ])
  }
}
</script>
