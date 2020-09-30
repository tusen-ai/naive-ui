<script>
import { h } from 'vue'
import { createClassObject } from '../../../data-table/src/utils'

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
  render () {
    const data = this.wrappedOption.data
    const children = data.render ? data.render(h, data, this.selected) : [ data.label ]
    const classObject = createClassObject(data.class)
    return h('div', {
      class: [
        'n-base-select-option',
        {
          'n-base-select-option--selected': this.selected,
          'n-base-select-option--disabled': data.disabled,
          'n-base-select-option--grouped': this.grouped,
          ...classObject
        }
      ],
      'n-option-index': this.index,
      style: data.style,
      onClick: this.handleClick,
      onMouseEnter: this.handleMouseEnter
    }, children)
  }
}
</script>
