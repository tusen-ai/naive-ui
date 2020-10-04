import { h, inject, toRef } from 'vue'
import { useMemo } from '../../../_utils/composition'
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
  setup (props) {
    const NBaseSelectMenu = inject('NBaseSelectMenu')
    const dataRef = toRef(props.wrappedOption, 'data')
    return {
      data: dataRef,
      isPending: useMemo(() => {
        return props.index === NBaseSelectMenu.pendingWrappedOptionIndex
      }),
      isSelected: useMemo(() => {
        const {
          multiple,
          value
        } = NBaseSelectMenu
        if (value === null) return false
        const optionValue = dataRef.value.value
        if (multiple) {
          const {
            valueSet
          } = NBaseSelectMenu
          return valueSet.has(optionValue)
        } else {
          return value === optionValue
        }
      })
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
    },
    handleMouseMove (e) {
      if (this.disabled || this.isPending) return
      this.NBaseSelectMenu.handleOptionMouseEnter(e, this.index, this.wrappedOption)
    }
  },
  render () {
    const { data } = this
    const children = data.render ? data.render(data, this.isSelected) : [ data.label ]
    const classObject = createClassObject(data.class)
    return h('div', {
      class: [
        'n-base-select-option',
        {
          'n-base-select-option--selected': this.isSelected,
          'n-base-select-option--disabled': data.disabled,
          'n-base-select-option--grouped': this.grouped,
          'n-base-select-option--pending': this.isPending,
          ...classObject
        }
      ],
      'n-option-index': this.index,
      style: data.style,
      onClick: this.handleClick,
      onMouseEnter: this.handleMouseEnter,
      onMouseMove: this.handleMouseMove
    }, children)
  }
}
