<script>
export default {
  name: 'NBaseSelectOption',
  inject: {
    NBaseSelectMenu: {
      default: null
    }
  },
  props: {
    wrappedOption: {
      type: Object,
      required: true
    },
    selected: {
      validator (value) {
        return typeof value === 'boolean'
      },
      default: false
    },
    grouped: {
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
    handleClick (e) {
      if (this.disabled) return
      this.NBaseSelectMenu.handleOptionClick(e, this.index, this.wrappedOption)
    },
    handleMouseEnter (e) {
      if (this.disabled) return
      this.NBaseSelectMenu.handleOptionMouseEnter(e, this.index, this.wrappedOption)
    }
  },
  render (h) {
    const data = this.wrappedOption.data
    const children = (data.render && data.render(h, data, this.selected)) || [ data.label ]
    return h('div', {
      staticClass: 'n-base-select-option',
      class: {
        'n-base-select-option--selected': this.selected,
        'n-base-select-option--disabled': data.disabled,
        'n-base-select-option--grouped': this.grouped
      },
      attrs: { 'n-option-index': this.index },
      style: data.style,
      on: {
        click: this.handleClick,
        mouseenter: this.handleMouseEnter
      }
    }, Array.isArray(children) ? children : [ children ])
  }
}
</script>
