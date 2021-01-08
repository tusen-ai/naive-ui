import { h, inject, toRef, defineComponent } from 'vue'
import { useMemo } from 'vooks'

export default defineComponent({
  name: 'NBaseSelectOption',
  inject: {
    NBaseSelectMenu: {
      default: null
    }
  },
  props: {
    tmNode: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const NBaseSelectMenu = inject('NBaseSelectMenu')
    const rawNodeRef = toRef(props.tmNode, 'rawNode')
    return {
      rawNode: rawNodeRef,
      isGrouped: useMemo(() => {
        const { tmNode } = props
        const { parent } = tmNode
        return parent && parent.rawNode.type === 'group'
      }),
      isPending: useMemo(() => {
        const { pendingTmNode } = NBaseSelectMenu
        if (!pendingTmNode) return false
        return props.tmNode.key === pendingTmNode.key
      }),
      isSelected: useMemo(() => {
        const { multiple, value } = NBaseSelectMenu
        if (value === null) return false
        const optionValue = rawNodeRef.value.value
        if (multiple) {
          const { valueSet } = NBaseSelectMenu
          return valueSet.has(optionValue)
        } else {
          return value === optionValue
        }
      })
    }
  },
  methods: {
    handleClick (e) {
      const { tmNode } = this
      if (tmNode.disabled) return
      this.NBaseSelectMenu.handleOptionClick(e, tmNode)
    },
    handleMouseEnter (e) {
      const { tmNode } = this
      if (tmNode.disabled) return
      this.NBaseSelectMenu.handleOptionMouseEnter(e, tmNode)
    },
    handleMouseMove (e) {
      const { tmNode, isPending } = this
      if (tmNode.disabled || isPending) return
      this.NBaseSelectMenu.handleOptionMouseEnter(e, tmNode)
    }
  },
  render () {
    const { rawNode } = this
    const children = rawNode.render
      ? rawNode.render(rawNode, this.isSelected)
      : [rawNode.label]
    return h(
      'div',
      {
        class: [
          'n-base-select-option',
          [
            rawNode.class,
            {
              'n-base-select-option--disabled': rawNode.disabled,
              'n-base-select-option--selected': this.isSelected,
              'n-base-select-option--grouped': this.isGrouped,
              'n-base-select-option--pending': this.isPending
            }
          ]
        ],
        style: rawNode.style,
        onClick: this.handleClick,
        onMouseEnter: this.handleMouseEnter,
        onMouseMove: this.handleMouseMove
      },
      children
    )
  }
})
