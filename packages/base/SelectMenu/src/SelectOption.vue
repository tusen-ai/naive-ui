<script>
export default {
  name: 'NBaseSelectOption',
  inject: {
    NBaseSelectMenu: {
      default: null
    }
  },
  props: {
    data: {
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
      this.NBaseSelectMenu.handleOptionClick(e, this.index, this.data)
    },
    handleMouseEnter (e) {
      if (this.disabled) return
      this.NBaseSelectMenu.handleOptionMouseEnter(e, this.index, this.data)
    }
  },
  render (h) {
    const children = (this.data.render && this.data.render(h, this.data, this.selected)) || [ this.data.label ]
    return h('div', {
      staticClass: 'n-base-select-option',
      class: {
        'n-base-select-option--selected': this.selected,
        'n-base-select-option--disabled': this.data.disabled,
        'n-base-select-option--grouped': this.grouped
      },
      on: {
        click: this.handleClick,
        mouseenter: this.handleMouseEnter
      }
    }, Array.isArray(children) ? children : [ children ])
  }
}
</script>
